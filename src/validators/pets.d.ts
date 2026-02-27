import { z } from "zod";
export declare const CreatePetSchema: z.ZodObject<{
    name: z.ZodString;
    species: z.ZodEnum<{
        cat: "cat";
        dragon: "dragon";
        blob: "blob";
        plant: "plant";
        rock: "rock";
    }>;
}, z.core.$strip>;
export declare const UpdatePetSchema: z.ZodObject<{
    name: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=pets.d.ts.map