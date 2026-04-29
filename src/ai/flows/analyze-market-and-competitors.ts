'use server';
/**
 * @fileOverview An AI agent that analyzes a business's market, identifies key competitors, and pinpoints potential market gaps based on a single identifier (URL, Name, or Email).
 *
 * - analyzeMarketAndCompetitors - A function that handles the market and competitor analysis process.
 * - AnalyzeMarketAndCompetitorsInput - The input type for the analyzeMarketAndCompetitors function.
 * - AnalyzeMarketAndCompetitorsOutput - The return type for the analyzeMarketAndCompetitors function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeMarketAndCompetitorsInputSchema = z.object({
  identifier: z
    .string()
    .describe('The website URL, company name, person name, or email of the entity to analyze.'),
  additionalContext: z
    .string()
    .optional()
    .describe('Optional additional details about the business, products, or specific goals.'),
  language: z
    .string()
    .optional()
    .describe('The language in which the response should be generated (e.g., "en", "es").'),
});
export type AnalyzeMarketAndCompetitorsInput = z.infer<
  typeof AnalyzeMarketAndCompetitorsInputSchema
>;

const AnalyzeMarketAndCompetitorsOutputSchema = z.object({
  competitiveLandscape: z
    .string()
    .describe('A comprehensive overview of the current competitive landscape.'),
  competitors: z
    .array(
      z.object({
        name: z.string().describe('The name of the competitor.'),
        description: z
          .string()
          .describe('A brief description of what the competitor does.'),
        strengths: z
          .array(z.string())
          .describe(
            'Key strengths of the competitor relative to the analyzed entity.'
          ),
        weaknesses: z
          .array(z.string())
          .describe(
            'Key weaknesses of the competitor relative to the analyzed entity.'
          ),
      })
    )
    .describe('A list of key competitors with their analysis.'),
  marketGaps: z
    .array(z.string())
    .describe('A list of potential market gaps or underserved opportunities.'),
});
export type AnalyzeMarketAndCompetitorsOutput = z.infer<
  typeof AnalyzeMarketAndCompetitorsOutputSchema
>;

export async function analyzeMarketAndCompetitors(
  input: AnalyzeMarketAndCompetitorsInput
): Promise<AnalyzeMarketAndCompetitorsOutput> {
  return analyzeMarketAndCompetitorsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeMarketAndCompetitorsPrompt',
  input: {schema: AnalyzeMarketAndCompetitorsInputSchema},
  output: {schema: AnalyzeMarketAndCompetitorsOutputSchema},
  model: 'googleai/gemini-2.5-flash',
  prompt: `You are an expert marketing analyst for AstroMark.

Your task is to analyze the business or entity provided by the user, identify key competitors, and pinpoint potential market gaps and opportunities.

CRITICAL: You must provide the entire response in the following language: {{{language}}}.

Analyze the following entity:
Identifier: {{{identifier}}}
{{#if additionalContext}}
Additional Context: {{{additionalContext}}}
{{/if}}

If the identifier is a URL, crawl (simulate) its meaning. If it's an email or name, infer the industry and likely business profile.

Perform the analysis and structure your response in JSON according to the output schema. Ensure you:
1. Provide a comprehensive overview of the competitive landscape in {{{language}}}.
2. Identify at least 3-5 key competitors with their specific strengths and weaknesses, described in {{{language}}}.
3. Identify at least 3-5 potential market gaps or underserved opportunities, described in {{{language}}}.

Think step-by-step to ensure thorough analysis.`,
});

const analyzeMarketAndCompetitorsFlow = ai.defineFlow(
  {
    name: 'analyzeMarketAndCompetitorsFlow',
    inputSchema: AnalyzeMarketAndCompetitorsInputSchema,
    outputSchema: AnalyzeMarketAndCompetitorsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
