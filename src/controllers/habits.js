import { pets } from "../models/pets.js";
import { habits, habitIdCounter } from "../models/habits.js";
import { logs } from "../models/logs.js";
import { CreateHabitSchema } from "../validators/habits.js";
import { computeStage } from "../utils/computeStage.js";
function isCooked(petId, lastFedAt) {
    const totalLogs = logs.filter((l) => l.petId === petId).length;
    return computeStage(totalLogs, lastFedAt).cooked;
}
export function createHabit(req, res) {
    const petId = Number(req.params.petId);
    const pet = pets.find((p) => p.id === petId);
    if (!pet)
        return res.status(404).json({ message: "Pet not found" });
    if (isCooked(petId, pet.lastFedAt)) {
        return res.status(400).json({ message: "This pet has been cooked. Adopt a new one." });
    }
    const parsed = CreateHabitSchema.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json(parsed.error);
    const habit = {
        id: habitIdCounter.value++,
        petId,
        ...parsed.data,
    };
    habits.push(habit);
    return res.status(201).json(habit);
}
export function listHabits(req, res) {
    const petId = Number(req.params.petId);
    const pet = pets.find((p) => p.id === petId);
    if (!pet)
        return res.status(404).json({ message: "Pet not found" });
    let result = habits.filter((h) => h.petId === petId);
    const category = req.query.category;
    if (category)
        result = result.filter((h) => h.category === category);
    res.json(result);
}
//# sourceMappingURL=habits.js.map