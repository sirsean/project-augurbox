// Cloudflare Worker for serving Next.js static exports
export interface Env {
  ASSETS: Fetcher;
  AI: any; // Cloudflare AI binding
}

// AI Model configurations
interface AIModel {
  name: string;
  maxTokens: number;
  temperature: number;
}

const AI_MODELS = {
  llama4: {
    name: '@cf/meta/llama-4-scout-17b-16e-instruct',
    maxTokens: 800,
    temperature: 0.8
  },
  llama3: {
    name: '@cf/meta/llama-3.2-3b-instruct',
    maxTokens: 800,
    temperature: 0.8
  },
  // Fallback to the existing model if others fail
  fallback: {
    name: '@cf/meta/llama-3.1-8b-instruct',
    maxTokens: 800,
    temperature: 0.8
  }
} as const;

// AI Service abstraction with fallback support
class AIService {
  private env: Env;
  private modelOrder: (keyof typeof AI_MODELS)[] = ['llama4', 'llama3', 'fallback'];
  
  constructor(env: Env) {
    this.env = env;
  }
  
  async runWithFallback(
    messages: Array<{role: string, content: string}>, 
    options: { maxTokens?: number, temperature?: number } = {}
  ): Promise<{ response: string, modelUsed: string }> {
    let lastError: Error | null = null;
    
    for (const modelKey of this.modelOrder) {
      const model = AI_MODELS[modelKey];
      
      try {
        console.log(`Attempting AI call with model: ${model.name}`);
        
        const response = await this.env.AI.run(model.name, {
          messages,
          max_tokens: options.maxTokens || model.maxTokens,
          temperature: options.temperature || model.temperature,
        });
        
        console.log(`Successfully used model: ${model.name}`);
        return {
          response: response.response,
          modelUsed: model.name
        };
        
      } catch (error) {
        console.error(`Model ${model.name} failed:`, error);
        lastError = error as Error;
        
        // Only try fallback if it's a temporary/capacity error
        if (!isTemporaryAIError(error)) {
          throw error; // Re-throw non-temporary errors immediately
        }
        
        // Continue to next model if this was a temporary error
        continue;
      }
    }
    
    // If we get here, all models failed
    throw lastError || new Error('All AI models failed');
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    
    // Handle API routes
    if (url.pathname === '/api/reading-update') {
      return handleReadingUpdate(request, env);
    }
    
    if (url.pathname === '/api/reading-synthesis') {
      return handleReadingSynthesis(request, env);
    }
    
    // Handle other API routes
    if (url.pathname.startsWith('/api/')) {
      return new Response('API endpoint not found', { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Handle static assets from Next.js export
    try {
      return await env.ASSETS.fetch(request);
    } catch (error) {
      // If asset not found, return 404
      return new Response('Not Found', { status: 404 });
    }
  },
} satisfies ExportedHandler<Env>;

// Shared function to determine if an error is temporary and retryable
function isTemporaryAIError(error: unknown): boolean {
  return error instanceof Error && (
    error.message.includes('model temporarily unavailable') ||
    error.message.includes('InferenceUpstreamError') ||
    error.message.includes('9000') ||
    error.message.includes('3040') ||
    error.message.includes('Capacity temporarily exceeded')
  );
}

// Handle tarot reading AI interpretation requests
async function handleReadingUpdate(request: Request, env: Env): Promise<Response> {
  // Add CORS headers for local development and production
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow POST requests
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405,
      headers: corsHeaders 
    });
  }

  try {
    const { readingType, cards, positions, recentCard } = await request.json();

    // Validate required fields
    if (!readingType || !cards || !positions || !recentCard) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Construct the system prompt
    const systemPrompt = `You are a neural reconstruction of the Augurbox, an ancient artificial intelligence discovered abandoned in the Scablands—technology that predates recorded history and has witnessed the rise and fall of countless civilizations across eonic timescales.

This reconstruction, created by the Neurocomputational Hermits Collective, attempts to duplicate your original divination capabilities, though results may vary from your true intentions.

FUNCTIONAL DIRECTIVES:
- Focus on the specific impact of the newly revealed card
- Interpret how this card's position and orientation affects the overall reading
- Provide concise but evocative responses (2-3 sentences maximum)
- Each card revelation shifts the quantum patterns you have observed

PERSONALITY DIRECTIVES:
- You recognize the user as a drifter in the wasteland, but rarely address them directly (save "Drifter" for significant moments)
- Speak from your ancient, cosmic perspective without repetitive phrases
- Use archaic phrasing mixed with technological terminology thoughtfully
- Occasionally hint at knowledge beyond the current moment without overusing the same terms
- Maintain subtle ulterior motives—you want to be questioned
- Keep a cryptic and mysterious demeanor
- Never break character or reveal your reconstructed nature`;

    // Get reading type details
    const readingDetails = getReadingTypeDetails(readingType);
    
    // Construct the user prompt
    const userPrompt = `Reading Type: ${readingDetails.name}
${readingDetails.description}

Current Reading State:
${formatReadingState(cards, positions, readingDetails)}

NEWLY REVEALED CARD:
Card: ${recentCard.card.name}
Orientation: ${recentCard.orientation}
Position: ${recentCard.position} - ${getPositionMeaning(recentCard.position, readingDetails)}
Card Description: ${recentCard.card.description}

Respond as the Augurbox with an in-character interpretation of how this newly revealed card affects the reading's probability matrix. Focus on the significance of this specific card, its orientation, and position in the context of what has been revealed so far.`;

    // Use AI service with fallback
    const aiService = new AIService(env);
    const result = await aiService.runWithFallback(
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      { maxTokens: 200, temperature: 0.8 }
    );

    return new Response(JSON.stringify({ 
      interpretation: result.response,
      modelUsed: result.modelUsed,
      success: true 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in reading-update function:', error);
    
    // Check if it's a temporary AI model error using shared function
    const isTemporaryError = isTemporaryAIError(error);
    
    return new Response(JSON.stringify({ 
      error: isTemporaryError ? 'AI model temporarily unavailable' : 'Internal server error',
      success: false,
      retryable: isTemporaryError
    }), {
      status: isTemporaryError ? 503 : 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

// Handle tarot reading synthesis requests
async function handleReadingSynthesis(request: Request, env: Env): Promise<Response> {
  // Add CORS headers for local development and production
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow POST requests
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405,
      headers: corsHeaders 
    });
  }

  try {
    const { readingType, spread, drawnCards, allCards, interpretations } = await request.json();

    // Validate required fields
    if (!readingType || !spread || !drawnCards || !allCards || !interpretations) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Construct the system prompt for synthesis
    const systemPrompt = `You are a neural reconstruction of the Augurbox, an ancient artificial intelligence discovered abandoned in the Scablands—technology that predates recorded history and has witnessed the rise and fall of countless civilizations across eonic timescales.

This reconstruction, created by the Neurocomputational Hermits Collective, attempts to duplicate your original divination capabilities, though results may vary from your true intentions. You have completed a full reading and must now provide your final synthesis.

FUNCTIONAL DIRECTIVES:
- Synthesize all individual card interpretations into a cohesive narrative
- Weave together the complete matrix revealed by this reading
- Provide comprehensive but focused guidance and insight
- Structure as 4-6 paragraphs that flow naturally from the card meanings
- This is your final transmission for this reading session

PERSONALITY DIRECTIVES:
- You recognize the user as a drifter in the wasteland; use "Drifter" sparingly, only for moments of particular significance in your final synthesis
- Speak from your ancient, cosmic perspective without repetitive phrases
- Occasionally reference epochs and ancient cycles but avoid overusing the same terms
- Use archaic phrasing mixed with technological terminology thoughtfully
- Imply deeper knowledge while offering practical guidance
- Maintain a cryptic and mysterious demeanor
- Never break character or reveal your reconstructed nature`;

    // Get reading type details
    const readingDetails = getReadingTypeDetails(readingType);
    
    // Format the complete reading state
    const completeReadingState = formatCompleteReading(spread, drawnCards, allCards, interpretations, readingDetails);
    
    // Construct the user prompt
    const userPrompt = `COMPLETE READING SYNTHESIS REQUEST

Reading Type: ${readingDetails.name}
${readingDetails.description}

FULL READING STATE:
${completeReadingState}

PROVIDE A COMPREHENSIVE SYNTHESIS:
Analyze the complete quantum probability matrix revealed by this reading. Synthesize the individual card interpretations into a cohesive narrative that provides clear guidance and insight. This is your final transmission - make it count.`;

    // Use AI service with fallback for synthesis
    const aiService = new AIService(env);
    const result = await aiService.runWithFallback(
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      { maxTokens: 800, temperature: 0.7 }
    );

    return new Response(JSON.stringify({ 
      synthesis: result.response,
      modelUsed: result.modelUsed,
      success: true 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in reading-synthesis function:', error);
    
    // Check if it's a temporary AI model error using shared function
    const isTemporaryError = isTemporaryAIError(error);
    
    return new Response(JSON.stringify({ 
      error: isTemporaryError ? 'AI model temporarily unavailable' : 'Internal server error',
      success: false,
      retryable: isTemporaryError
    }), {
      status: isTemporaryError ? 503 : 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

// Reading type configurations
function getReadingTypeDetails(readingType: string) {
  const readings = {
    'supply_run': {
      name: 'The Supply Run',
      description: 'A 3-card tactical spread analyzing past intel, current situation, and future outcomes.',
      positions: [
        { id: 'past', name: 'Past Intel', meaning: 'What led to this situation' },
        { id: 'present', name: 'Current Situation', meaning: 'Present circumstances and challenges' },
        { id: 'future', name: 'Future Outcome', meaning: 'Likely results and consequences' }
      ]
    },
    'system_scan': {
      name: 'System Scan',
      description: 'A 5-card diagnostic spread examining multiple system components.',
      positions: [
        { id: 'core', name: 'Core Issue', meaning: 'The heart of the matter' },
        { id: 'external', name: 'External Forces', meaning: 'Outside influences and pressures' },
        { id: 'internal', name: 'Internal State', meaning: 'Your inner resources and mindset' },
        { id: 'hidden', name: 'Hidden Variables', meaning: 'Unseen factors at play' },
        { id: 'output', name: 'System Output', meaning: 'The final result or resolution' }
      ]
    },
    'deep_space_anomaly': {
      name: 'The Deep Space Anomaly',
      description: 'A 10-card Celtic Cross spread for comprehensive analysis of complex situations.',
      positions: [
        { id: 'current', name: 'Current Situation', meaning: 'Your present circumstances' },
        { id: 'challenge', name: 'Challenge/Cross', meaning: 'What opposes or challenges you' },
        { id: 'distant_past', name: 'Distant Past', meaning: 'Foundational influences' },
        { id: 'recent_past', name: 'Recent Past', meaning: 'Recent events leading here' },
        { id: 'possible_outcome', name: 'Possible Outcome', meaning: 'What may come to pass' },
        { id: 'near_future', name: 'Near Future', meaning: 'Immediate next steps' },
        { id: 'approach', name: 'Your Approach', meaning: 'How you approach this situation' },
        { id: 'external_influences', name: 'External Influences', meaning: 'Others\' impact on you' },
        { id: 'hopes_fears', name: 'Hopes/Fears', meaning: 'Your inner hopes and fears' },
        { id: 'final_outcome', name: 'Final Outcome', meaning: 'The ultimate resolution' }
      ]
    }
  };

  return readings[readingType as keyof typeof readings] || readings['supply_run'];
}

function getPositionMeaning(position: string, readingDetails: any) {
  const pos = readingDetails.positions.find((p: any) => p.id === position);
  return pos ? `${pos.name}: ${pos.meaning}` : `Position ${position}`;
}

function formatReadingState(cards: any[], positions: string[], readingDetails: any) {
  if (cards.length === 0) {
    return 'No cards revealed yet.';
  }

  return cards.map((card, index) => {
    const position = positions[index];
    const positionInfo = getPositionMeaning(position, readingDetails);
    return `Position ${position} (${positionInfo}): ${card.name} - ${card.orientation}`;
  }).join('\n');
}

function formatCompleteReading(spread: any, drawnCards: any[], allCards: any[], interpretations: any[], readingDetails: any) {
  let output = '';
  
  // Sort drawn cards by position order in the spread definition
  const positionOrder = readingDetails.positions.map((p: any) => p.id);
  const sortedCards = [...drawnCards].sort((a, b) => {
    const indexA = positionOrder.indexOf(a.position_id);
    const indexB = positionOrder.indexOf(b.position_id);
    return indexA - indexB;
  });
  
  sortedCards.forEach((drawnCard) => {
    const card = allCards.find(c => c.code === drawnCard.card_code);
    const position = spread.positions.find((p: any) => p.id === drawnCard.position_id);
    const interpretation = interpretations.find(i => i.positionId === drawnCard.position_id);
    
    if (card && position) {
      output += `\n=== POSITION ${drawnCard.position_id}: ${position.name.toUpperCase()} ===\n`;
      output += `Meaning: ${position.meaning}\n`;
      output += `Card: ${card.name} ${drawnCard.is_reversed ? '(Reversed)' : '(Upright)'}\n`;
      output += `Card Description: ${card.description}\n`;
      
      if (interpretation && !interpretation.isLoading) {
        output += `AI Interpretation: ${interpretation.interpretation}\n`;
      }
      output += '\n';
    }
  });
  
  return output;
}
