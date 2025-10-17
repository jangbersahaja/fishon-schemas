import { z } from "zod";
/**
 * Schema for draft patch payload (server-side validation)
 * Used when updating a charter draft with partial data
 */
export declare const DraftPatchSchema: z.ZodObject<{
    dataPartial: z.ZodAny;
    clientVersion: z.ZodNumber;
    currentStep: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
