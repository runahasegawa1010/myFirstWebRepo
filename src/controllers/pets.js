import { pets, petIdCounter } from "../models/pets.js";
import { logs } from "../models/logs.js";
import { CreatePetSchema, UpdatePetSchema } from "../validators/pets.js";
import { computeStage } from "../utils/computeStage.js";
function withStage(pet) {
    const totalLogs = logs.filter((l) => l.petId === pet.id).length;
    const { stage, stageEmoji } = computeStage(totalLogs, pet.lastFedAt);
    return { ...pet, stage, stageEmoji };
}
export function health(_req, res) {
    res.json({ ok: true });
}
export function createPet(req, res) {
    const parsed = CreatePetSchema.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json(parsed.error);
    const pet = {
        id: petIdCounter.value++,
        name: parsed.data.name,
        species: parsed.data.species,
        happiness: 50,
        hunger: 50,
        energy: 50,
        lastFedAt: new Date(),
    };
    pets.push(pet);
    return res.status(201).json(withStage(pet));
}
export function listPets(req, res) {
    let result = [...pets];
    const species = req.query.species;
    if (species)
        result = result.filter((p) => p.species === species);
    const minHappinessStr = req.query.minHappiness;
    if (minHappinessStr !== undefined) {
        const min = Number(minHappinessStr);
        if (!Number.isNaN(min))
            result = result.filter((p) => p.happiness >= min);
    }
    res.json(result.map(withStage));
}
export function getPet(req, res) {
    const id = Number(req.params.petId);
    const pet = pets.find((p) => p.id === id);
    if (!pet)
        return res.status(404).json({ message: "Pet not found" });
    res.json(withStage(pet));
}
export function updatePet(req, res) {
    const id = Number(req.params.petId);
    const pet = pets.find((p) => p.id === id);
    if (!pet)
        return res.status(404).json({ message: "Pet not found" });
    const parsed = UpdatePetSchema.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json(parsed.error);
    pet.name = parsed.data.name;
    res.json(withStage(pet));
}
export function deletePet(req, res) {
    const id = Number(req.params.petId);
    const index = pets.findIndex((p) => p.id === id);
    if (index === -1)
        return res.status(404).json({ message: "Pet not found" });
    pets.splice(index, 1);
    res.status(204).send();
}
//# sourceMappingURL=pets.js.map