/**
 * Prompt Template System for Style Consistency Enhancement
 * 
 * This module provides a flexible style embedding system that allows writers
 * and content creators to adjust tone and style without requiring code changes.
 * 
 * The style embedding system works by:
 * 1. Defining reusable style tags that can be prepended to prompts
 * 2. Allowing easy customization of tone, mood, and artistic direction
 * 3. Maintaining consistency across all generated content
 * 4. Enabling A/B testing of different style approaches
 */

export interface StyleEmbedding {
  /** Unique identifier for the style */
  id: string;
  /** Human-readable name for the style */
  name: string;
  /** Description of what this style achieves */
  description: string;
  /** The actual style tag/prefix to prepend to prompts */
  tag: string;
  /** Detailed style instructions that modify the master prompt */
  instructions: string;
  /** Whether this style is currently active/enabled */
  enabled: boolean;
}

/**
 * Available style embeddings for prompt enhancement
 * Writers can modify these without touching code logic
 */
export const styleEmbeddings: StyleEmbedding[] = [
  {
    id: 'flux_mystical',
    name: 'Mystical Enhancement',
    description: 'Enhances the mystical and ethereal qualities with deeper spiritual undertones',
    tag: '[FluxMystical]',
    instructions: `Amplify mystical and ethereal elements. Use deeper, more saturated colors with subtle luminescence. Add atmospheric effects like soft glowing auras, wisps of energy, or subtle light rays. Emphasize spiritual symbolism through enhanced lighting and mystical particles or energy flows.`,
    enabled: false
  },
  {
    id: 'flux_classical',
    name: 'Classical Tarot',
    description: 'Traditional Rider-Waite style with classic color palette and compositions',
    tag: '[FluxClassical]',
    instructions: `Maintain strict adherence to traditional Rider-Waite imagery and color schemes. Use the classic yellow sky backgrounds, traditional color symbolism (red for passion, blue for spirituality, etc.), and exact positioning of symbolic elements as found in the original deck.`,
    enabled: false
  },
  {
    id: 'flux_modern',
    name: 'Modern Artistic',
    description: 'Contemporary artistic interpretation with updated visual aesthetics',
    tag: '[FluxModern]',
    instructions: `Apply contemporary artistic techniques with updated color palettes, modern composition principles, and subtle geometric elements. Maintain symbolic meaning while using current digital art aesthetics, gradient effects, and modern lighting techniques.`,
    enabled: false
  },
  {
    id: 'flux_cinematic',
    name: 'Cinematic Drama',
    description: 'Film-like dramatic lighting and composition for heightened emotional impact',
    tag: '[FluxCinematic]',
    instructions: `Use cinematic lighting techniques with dramatic shadows and highlights. Apply depth of field effects, atmospheric perspective, and movie-like composition. Enhance emotional impact through dynamic camera angles and theatrical lighting scenarios.`,
    enabled: false
  },
  {
    id: 'flux_minimalist',
    name: 'Minimalist Symbolic',
    description: 'Clean, simplified approach focusing on essential symbolic elements',
    tag: '[FluxMinimal]',
    instructions: `Reduce visual complexity to essential symbolic elements. Use clean lines, simplified forms, and strategic negative space. Focus on core symbolic meaning with refined color palettes and geometric clarity while maintaining mystical essence.`,
    enabled: true
  }
];

/**
 * Get the currently active style embedding
 */
export function getActiveStyle(): StyleEmbedding | null {
  return styleEmbeddings.find(style => style.enabled) || null;
}

/**
 * Get all available styles
 */
export function getAllStyles(): StyleEmbedding[] {
  return styleEmbeddings;
}

/**
 * Enable a specific style by ID (disables all others)
 */
export function setActiveStyle(styleId: string): boolean {
  // Disable all styles first
  styleEmbeddings.forEach(style => style.enabled = false);
  
  // Enable the requested style
  const targetStyle = styleEmbeddings.find(style => style.id === styleId);
  if (targetStyle) {
    targetStyle.enabled = true;
    return true;
  }
  return false;
}

/**
 * Apply style embedding to a prompt
 * This function can be used to enhance prompts with the active style
 */
export function applyStyleEmbedding(basePrompt: string): string {
  const activeStyle = getActiveStyle();
  
  if (!activeStyle) {
    return basePrompt;
  }
  
  // Prepend style tag and integrate style instructions
  return `${activeStyle.tag} ${basePrompt}\n\nSTYLE ENHANCEMENT: ${activeStyle.instructions}`;
}

/**
 * Template configuration for different prompt contexts
 */
export interface PromptTemplate {
  /** Template identifier */
  id: string;
  /** Context where this template applies */
  context: 'refinement' | 'generation' | 'enhancement';
  /** Base instruction template */
  instruction: string;
  /** Whether to apply style embedding */
  useStyleEmbedding: boolean;
}

/**
 * Available prompt templates for different contexts
 */
export const promptTemplates: PromptTemplate[] = [
  {
    id: 'refinement_default',
    context: 'refinement',
    instruction: 'Refine the above into a single, vivid image generation prompt (max 120 words). Keep all lore-specific nouns. Do not mention tarot or camera brands.',
    useStyleEmbedding: true
  },
  {
    id: 'refinement_detailed',
    context: 'refinement',
    instruction: 'Transform the above into a comprehensive, vivid image generation prompt (max 150 words). Preserve all symbolic and lore-specific elements while enhancing visual and atmospheric details. Avoid mentioning tarot explicitly or camera/photography brands.',
    useStyleEmbedding: true
  },
  {
    id: 'refinement_concise',
    context: 'refinement',
    instruction: 'Distill the above into a focused, vivid image prompt (max 80 words). Retain essential symbolic elements and lore-specific nouns. Exclude tarot references and camera brands.',
    useStyleEmbedding: true
  }
];

/**
 * Get a specific prompt template by ID
 */
export function getPromptTemplate(templateId: string): PromptTemplate | null {
  return promptTemplates.find(template => template.id === templateId) || null;
}

/**
 * Get the default refinement template
 */
export function getDefaultRefinementTemplate(): PromptTemplate {
  return getPromptTemplate('refinement_default') || promptTemplates[0];
}

/**
 * Build a complete prompt using template and style embedding
 */
export function buildEnhancedPrompt(
  masterPrompt: string,
  cardPrompt: string,
  templateId: string = 'refinement_default'
): {
  systemPrompt: string;
  userPrompt: string;
} {
  const template = getPromptTemplate(templateId) || getDefaultRefinementTemplate();
  
  // Apply style embedding to master prompt if enabled
  const enhancedMasterPrompt = template.useStyleEmbedding 
    ? applyStyleEmbedding(masterPrompt)
    : masterPrompt;
  
  // Build the user prompt with style-enhanced card prompt
  const enhancedCardPrompt = template.useStyleEmbedding
    ? applyStyleEmbedding(cardPrompt)
    : cardPrompt;
  
  const userPrompt = `${enhancedCardPrompt}\n\n${template.instruction}`;
  
  return {
    systemPrompt: enhancedMasterPrompt,
    userPrompt: userPrompt
  };
}

export default {
  styleEmbeddings,
  promptTemplates,
  getActiveStyle,
  getAllStyles,
  setActiveStyle,
  applyStyleEmbedding,
  getPromptTemplate,
  getDefaultRefinementTemplate,
  buildEnhancedPrompt
};
