import { z } from "zod";
 
export const brewSchema = z.object({
  drink: z.string(),
  task: z.string(),
  description: z.string(),
  steps: z.array(z.string()),
});
 
export type BrewSchema = typeof brewSchema;