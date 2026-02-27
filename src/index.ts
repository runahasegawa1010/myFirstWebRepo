import 'dotenv/config';
import express from "express";
import * as petsController from "./controllers/pets.js";
import * as habitsController from "./controllers/habits.js";
import * as logsController from "./controllers/logs.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", petsController.health);

app.post("/pets", petsController.createPet);
app.get("/pets", petsController.listPets);
app.get("/pets/:petId", petsController.getPet);
app.put("/pets/:petId", petsController.updatePet);
app.delete("/pets/:petId", petsController.deletePet);

app.post("/pets/:petId/habits", habitsController.createHabit);
app.get("/pets/:petId/habits", habitsController.listHabits);

app.post("/pets/:petId/logs", logsController.createLog);

const PORT = process.env.PORT || 9812;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});