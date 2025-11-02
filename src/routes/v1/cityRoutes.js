import { Router } from "express";
import { CityController } from "../../controllers/index.js";

const cityRouter = Router();

cityRouter.post("/", CityController.createCity);
cityRouter.get("/:id", CityController.getCity);
cityRouter.get("/", CityController.getCities);
cityRouter.patch("/:id", CityController.updateCity);
cityRouter.delete("/:id", CityController.deleteCity);

export default cityRouter;
