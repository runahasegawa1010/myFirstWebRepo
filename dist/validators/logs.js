import { z } from "zod";
export const CreateLogSchema = z.object({
    habitId: z.number().int(),
    date: z.string().min(1),
    note: z.string().max(200).optional(),
});
//# sourceMappingURL=logs.js.map