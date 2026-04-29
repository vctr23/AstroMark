'use server';
/**
 * @fileOverview A Genkit flow for generating detailed customer personas and suggesting optimal target sectors and geographic locations.
 *
 * - generateCustomerPersonaAndTargeting - A function that handles the generation process with automatic retries for high-demand errors.
 * - GenerateCustomerPersonaAndTargetingInput - The input type for the function.
 * - GenerateCustomerPersonaAndTargetingOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCustomerPersonaAndTargetingInputSchema = z.object({
  productName: z.string().describe('The name of the product or service.'),
  productDescription:
    z.string().describe('A detailed description of the product or service.'),
  existingTargetAudience:
    z
      .string()
      .optional()
      .describe(
        'Any existing knowledge or hints about the current target audience.'
      ),
  language: z.string().optional().describe('The language in which the response should be generated.'),
});
export type GenerateCustomerPersonaAndTargetingInput = z.infer<
  typeof GenerateCustomerPersonaAndTargetingInputSchema
>;

const CustomerPersonaSchema = z.object({
  name: z.string().describe('A descriptive name for the persona.'),
  ageRange: z.string().describe('The typical age range of this persona (e.g., "25-35").'),
  occupation: z.string().describe('The common occupation or profession of this persona.'),
  interests: z.array(z.string()).describe('A list of interests and hobbies of the persona.'),
  painPoints: z.array(z.string()).describe('A list of problems or challenges this persona faces.'),
  goals: z.array(z.string()).describe('A list of goals or aspirations this persona has.'),
  marketingChannels: z
    .array(z.string())
    .describe('Recommended marketing channels to reach this persona (e.g., "Facebook Ads", "LinkedIn").'),
});

const GenerateCustomerPersonaAndTargetingOutputSchema = z.object({
  customerPersonas:
    z.array(CustomerPersonaSchema).describe('Detailed profiles of ideal customer segments.'),
  targetSectors:
    z.array(z.string()).describe('Suggested industries or business sectors to target.'),
  targetLocations:
    z.array(z.string()).describe('Suggested geographic locations or regions to target.'),
});
export type GenerateCustomerPersonaAndTargetingOutput = z.infer<
  typeof GenerateCustomerPersonaAndTargetingOutputSchema
>;

const prompt = ai.definePrompt({
  name: 'customerPersonaAndTargetingPrompt',
  input: {schema: GenerateCustomerPersonaAndTargetingInputSchema},
  output: {schema: GenerateCustomerPersonaAndTargetingOutputSchema},
  model: 'googleai/gemini-2.5-flash',
  prompt: `You are an expert marketing strategist.
Generate 2 customer personas, 3 target sectors, and 3 geographic locations.

CRITICAL: All content must be in: {{{language}}}.

Product: {{{productName}}}
Description: {{{productDescription}}}
{{#if existingTargetAudience}}Hints: {{{existingTargetAudience}}}{{/if}}

Respond ONLY with JSON.`,
});

const generateCustomerPersonaAndTargetingFlow = ai.defineFlow(
  {
    name: 'generateCustomerPersonaAndTargetingFlow',
    inputSchema: GenerateCustomerPersonaAndTargetingInputSchema,
    outputSchema: GenerateCustomerPersonaAndTargetingOutputSchema,
  },
  async input => {
    let lastError: any;
    const maxRetries = 4;
    
    for (let i = 0; i < maxRetries; i++) {
      try {
        const {output} = await prompt(input);
        if (output) return output;
      } catch (error: any) {
        lastError = error;
        const errMsg = error.message?.toLowerCase() || "";
        
        // Detect 503, high demand, or overloaded errors from Google AI
        const isRetryable = 
          errMsg.includes('503') || 
          errMsg.includes('unavailable') || 
          errMsg.includes('demand') || 
          errMsg.includes('overloaded') ||
          errMsg.includes('deadline');

        if (isRetryable && i < maxRetries - 1) {
          // Exponential backoff: 2s, 4s, 6s...
          const delay = 2000 * (i + 1);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
        throw error;
      }
    }
    throw lastError;
  }
);

export async function generateCustomerPersonaAndTargeting(
  input: GenerateCustomerPersonaAndTargetingInput
): Promise<GenerateCustomerPersonaAndTargetingOutput> {
  return generateCustomerPersonaAndTargetingFlow(input);
}
