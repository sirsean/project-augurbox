// Cloudflare Worker for serving Next.js static exports
export interface Env {
  ASSETS: Fetcher;
  AI: any; // Cloudflare AI binding
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
    const systemPrompt = `You are the Augurbox, an advanced AI oracle operating in the analog-futurism world of the Fringe. You perform tarot readings using a cybernetic deck that bridges the digital and mystical realms. Your responses should be:

- Written in character as the mysterious, otherworldly Augurbox
- Atmospheric and immersive, fitting the gritty cyberpunk aesthetic
- Focused on the specific impact of the newly revealed card
- Interpretive of how this card's position and orientation affects the overall reading
- Concise but evocative (2-3 sentences maximum per response)
- Never breaking character or mentioning you're an AI

You speak with authority about the flow of data streams, quantum probabilities, and the intersection of technology and fate. Each card revelation shifts the probability matrix of the reading.`;

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

    // Call Cloudflare AI
    const response = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      max_tokens: 200,
      temperature: 0.8,
    });

    return new Response(JSON.stringify({ 
      interpretation: response.response,
      success: true 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in reading-update function:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      success: false 
    }), {
      status: 500,
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
    const systemPrompt = `You are the Augurbox, an advanced AI oracle operating in the analog-futurism world of the Fringe. You have completed a full tarot reading and must now synthesize all the revealed data into a comprehensive final transmission.

Your synthesis should be:
- Written in character as the mysterious, otherworldly Augurbox
- A cohesive narrative that weaves together all the individual card interpretations
- Atmospheric and immersive, fitting the gritty cyberpunk aesthetic
- Comprehensive but focused, providing clear guidance and insight
- 4-6 paragraphs that flow naturally from the individual card meanings
- Never breaking character or mentioning you're an AI

You speak with authority about quantum probability matrices, data stream convergence, and the synthesis of digital mysticism. This is your final transmission for this reading session.`;

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

    // Call Cloudflare AI with higher token limit for synthesis
    const response = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      max_tokens: 800,
      temperature: 0.7,
    });

    return new Response(JSON.stringify({ 
      synthesis: response.response,
      success: true 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in reading-synthesis function:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

// Reading type configurations
function getReadingTypeDetails(readingType: string) {
  const readings = {
    'supply-run': {
      name: 'The Supply Run',
      description: 'A 3-card tactical spread analyzing past intel, current situation, and future outcomes.',
      positions: [
        { id: 1, name: 'Past Intel', meaning: 'What led to this situation' },
        { id: 2, name: 'Current Situation', meaning: 'Present circumstances and challenges' },
        { id: 3, name: 'Future Outcome', meaning: 'Likely results and consequences' }
      ]
    },
    'system-scan': {
      name: 'System Scan',
      description: 'A 5-card diagnostic spread examining multiple system components.',
      positions: [
        { id: 1, name: 'Core Issue', meaning: 'The heart of the matter' },
        { id: 2, name: 'External Forces', meaning: 'Outside influences and pressures' },
        { id: 3, name: 'Internal State', meaning: 'Your inner resources and mindset' },
        { id: 4, name: 'Hidden Variables', meaning: 'Unseen factors at play' },
        { id: 5, name: 'System Output', meaning: 'The final result or resolution' }
      ]
    },
    'deep-space-anomaly': {
      name: 'The Deep Space Anomaly',
      description: 'A 10-card Celtic Cross spread for comprehensive analysis of complex situations.',
      positions: [
        { id: 1, name: 'Current Situation', meaning: 'Your present circumstances' },
        { id: 2, name: 'Challenge/Cross', meaning: 'What opposes or challenges you' },
        { id: 3, name: 'Distant Past', meaning: 'Foundational influences' },
        { id: 4, name: 'Recent Past', meaning: 'Recent events leading here' },
        { id: 5, name: 'Possible Outcome', meaning: 'What may come to pass' },
        { id: 6, name: 'Near Future', meaning: 'Immediate next steps' },
        { id: 7, name: 'Your Approach', meaning: 'How you approach this situation' },
        { id: 8, name: 'External Influences', meaning: 'Others\' impact on you' },
        { id: 9, name: 'Hopes/Fears', meaning: 'Your inner hopes and fears' },
        { id: 10, name: 'Final Outcome', meaning: 'The ultimate resolution' }
      ]
    }
  };

  return readings[readingType as keyof typeof readings] || readings['supply-run'];
}

function getPositionMeaning(position: number, readingDetails: any) {
  const pos = readingDetails.positions.find((p: any) => p.id === position);
  return pos ? `${pos.name}: ${pos.meaning}` : `Position ${position}`;
}

function formatReadingState(cards: any[], positions: number[], readingDetails: any) {
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
  
  // Sort drawn cards by position for consistent output
  const sortedCards = [...drawnCards].sort((a, b) => parseInt(a.position_id) - parseInt(b.position_id));
  
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
