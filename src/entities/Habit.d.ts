export type HabitCategory = "health" | "fitness" | "mindfulness" | "learning" | "social";
export type StatBoost = "happiness" | "hunger" | "energy";
export type Habit = {
    id: number;
    petId: number;
    name: string;
    category: HabitCategory;
    targetFrequency: number;
    statBoost: StatBoost;
};
//# sourceMappingURL=Habit.d.ts.map