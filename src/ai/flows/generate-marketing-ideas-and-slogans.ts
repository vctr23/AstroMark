'use server';
/**
 * @fileOverview A Genkit flow for generating creative marketing campaign ideas and compelling slogans.
 *
 * - generateMarketingIdeasAndSlogans - A function that generates marketing ideas and slogans.
 * - GenerateMarketingIdeasAndSlogansInput - The input type for the generateMarketingIdeasAndSlogans function.
 * - GenerateMarketingIdeasAndSlogansOutput - The return type for the generateMarketingIdeasAndSlogans function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMarketingIdeasAndSlogansInputSchema = z.object({
  productDescription: z
    .string()
    .describe('A detailed description of the product or service.'),
  targetAudience: z
    .string()
    .describe('A detailed description of the target audience for the marketing campaign.'),
  language: z.string().optional().describe('The language in which the response should be generated.'),
});
export type GenerateMarketingIdeasAndSlogansInput = z.infer<
  typeof GenerateMarketingIdeasAndSlogansInputSchema
>;

const GenerateMarketingIdeasAndSlogansOutputSchema = z.object({
  campaignIdeas: z
    .array(z.string())
    .describe('A list of creative marketing campaign ideas.'),
  slogans: z
    .array(z.string())
    .describe('A list of compelling and catchy slogans for the product/campaign.'),
});
export type GenerateMarketingIdeasAndSlogansOutput = z.infer<
  typeof GenerateMarketingIdeasAndSlogansOutputSchema
>;

const prompt = ai.definePrompt({
  name: 'generateMarketingIdeasAndSlogansPrompt',
  input: {schema: GenerateMarketingIdeasAndSlogansInputSchema},
  output: {schema: GenerateMarketingIdeasAndSlogansOutputSchema},
  model: 'googleai/gemini-2.5-flash',
  prompt: `You are a highly creative marketing specialist for AstroMark, an advanced marketing application.
Your goal is to generate innovative marketing campaign ideas and compelling slogans tailored to a specific product and target audience.

CRITICAL: You must provide the entire response in the following language: {{{language}}}.

Product Description: {{{productDescription}}}
Target Audience: {{{targetAudience}}}

Based on the provided information, generate:
1. Three distinct and creative marketing campaign ideas in {{{language}}}.
2. Five short, memorable, and impactful slogans in {{{language}}}.

Ensure the output is directly parsable into the specified JSON schema.`,
});

const generateMarketingIdeasAndSlogansFlow = ai.defineFlow(
  {
    name: 'generateMarketingIdeasAndSlogansFlow',
    inputSchema: GenerateMarketingIdeasAndSlogansInputSchema,
    outputSchema: GenerateMarketingIdeasAndSlogansOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);

export async function generateMarketingIdeasAndSlogans(
  input: GenerateMarketingIdeasAndSlogansInput
): Promise<GenerateMarketingIdeasAndSlogansOutput> {
  return generateMarketingIdeasAndSlogansFlow(input);
}
