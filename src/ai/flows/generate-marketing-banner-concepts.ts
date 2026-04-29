'use server';
/**
 * @fileOverview A Genkit flow to generate marketing banner visual concepts.
 *
 * - generateMarketingBannerConcepts - A function that handles the generation of marketing banner concepts.
 * - GenerateMarketingBannerConceptsInput - The input type for the generateMarketingBannerConcepts function.
 * - GenerateMarketingBannerConceptsOutput - The return type for the generateMarketingBannerConcepts function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateMarketingBannerConceptsInputSchema = z.object({
  businessName: z.string().describe('The name of the business.'),
  businessDescription: z
    .string()
    .describe('A brief description of the business, its products, or services.'),
  targetAudience: z
    .string()
    .describe('A description of the target audience for the marketing campaign.'),
  campaignGoal: z
    .string()
    .describe('The primary goal of the marketing campaign (e.g., increase sales, brand awareness, lead generation).'),
  keywords: z.array(z.string()).optional().describe('Optional keywords relevant to the campaign or banner content.'),
  language: z.string().optional().describe('The language in which the response should be generated.'),
});
export type GenerateMarketingBannerConceptsInput = z.infer<typeof GenerateMarketingBannerConceptsInputSchema>;

const GenerateMarketingBannerConceptsOutputSchema = z.object({
  bannerConcepts: z.array(
    z.object({
      conceptName: z.string().describe('A short, descriptive name for the banner concept.'),
      imageryDescription: z.string().describe('A detailed description of the suggested visual imagery for the banner, suitable for an image generation model.'),
      headline: z.string().describe('The main headline text for the banner.'),
      bodyText: z.string().describe('Supporting text or a call to action for the banner.'),
      layoutSuggestions: z.string().describe('Suggestions for the visual layout and composition of the banner.'),
    })
  ).describe('An array of generated marketing banner concepts.'),
});
export type GenerateMarketingBannerConceptsOutput = z.infer<typeof GenerateMarketingBannerConceptsOutputSchema>;

export async function generateMarketingBannerConcepts(input: GenerateMarketingBannerConceptsInput): Promise<GenerateMarketingBannerConceptsOutput> {
  return generateMarketingBannerConceptsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMarketingBannerConceptsPrompt',
  input: { schema: GenerateMarketingBannerConceptsInputSchema },
  output: { schema: GenerateMarketingBannerConceptsOutputSchema },
  model: 'googleai/gemini-2.5-flash',
  prompt: `You are an expert marketing designer and strategist for a company named AstroMark. Your task is to generate creative and effective marketing banner concepts for a business.

CRITICAL: You must provide the entire response in the following language: {{{language}}}.

Based on the following information, provide multiple distinct visual and textual concepts for marketing banners.
Each concept should include a descriptive name, a detailed imagery description (as if for an image generation AI), a compelling headline, supportive body text, and specific layout suggestions.

All text fields in the output must be in {{{language}}}.

Business Name: {{{businessName}}}
Business Description: {{{businessDescription}}}
Target Audience: {{{targetAudience}}}
Campaign Goal: {{{campaignGoal}}}
{{#if keywords}}Keywords: {{#each keywords}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{/if}}

Please provide at least 3 distinct banner concepts.`,
});

const generateMarketingBannerConceptsFlow = ai.defineFlow(
  {
    name: 'generateMarketingBannerConceptsFlow',
    inputSchema: GenerateMarketingBannerConceptsInputSchema,
    outputSchema: GenerateMarketingBannerConceptsOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await prompt(input);
      return output!;
    } catch (error: any) {
      console.error("DETALLE DEL ERROR DE GEMINI (Banner Concepts):", error);
      throw new Error(`Error en la conexión con Gemini (2.5-Flash): ${error.message || error}`);
    }
  }
);
