import { z } from "zod";
export declare const CreateHabitSchema: z.ZodObject<{
    name: z.ZodString;
    category: z.ZodEnum<{
        health: "health";
        fitness: "fitness";
        mindfulness: "mindfulness";
        learning: "learning";
        social: "social";
    }>;
    targetFrequency: z.ZodNumber;
    statBoost: z.ZodEnum<{
        happiness: "happiness";
        hunger: "hunger";
        energy: "energy";
    }>;
}, z.core.$strip>;
//# sourceMappingURL=habits.d.ts.map