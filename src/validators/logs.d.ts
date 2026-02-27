import { z } from "zod";
export declare const CreateLogSchema: z.ZodObject<{
    habitId: z.ZodNumber;
    date: z.ZodString;
    note: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=logs.d.ts.map