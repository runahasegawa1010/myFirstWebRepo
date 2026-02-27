import { pets } from "../models/pets.js";
import { habits } from "../models/habits.js";
import { logs, logIdCounter } from "../models/logs.js";
import { CreateLogSchema } from "../validators/logs.js";
import { computeStage } from "../utils/computeStage.js";
function clamp100(n) {
    return Math.max(0, Math.min(100, n));
}
function isCooked(petId, lastFedAt) {
    const totalLogs = logs.filter((l) => l.petId === petId).length;
    return computeStage(totalLogs, lastFedAt).cooked;
}
export function createLog(req, res) {
    const petId = Number(req.params.petId);
    const pet = pets.find((p) => p.id === petId);
    if (!pet)
        return res.status(404).json({ message: "Pet not found" });
    if (isCooked(petId, pet.lastFedAt)) {
        return res.status(400).json({ "message": "This pet has been cooked. Adopt a new one." });
    }
    const parsed = CreateLogSchema.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json(parsed.error);
    const habit = habits.find((h) => h.id === parsed.data.habitId);
    if (!habit || habit.petId !== petId) {
        return res.status(400).json({ message: "Habit does not belong to this pet" });
    }
    const stat = habit.statBoost;
    pet[stat] = clamp100((pet[stat] ?? 0) + 10);
    pet.lastFedAt = new Date();
    const log = {
        id: logIdCounter.value++,
        petId,
        habitId: parsed.data.habitId,
        date: parsed.data.date,
        ...(parsed.data.note ? { note: parsed.data.note } : {}),
    };
    logs.push(log);
    return res.status(201).json(log);
}
//# sourceMappingURL=logs.js.map