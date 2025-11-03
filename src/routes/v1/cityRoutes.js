import { Router } from "express";
import { CityController } from "../../controllers/index.js";
import { validateRequestBody } from "../../validators/index.js";
import {
  createCitySchema,
  updateCitySchema,
} from "../../validators/cityValidator.js";

const cityRouter = Router();

cityRouter.post(
  "/",
  validateRequestBody(createCitySchema),
  CityController.createCity
);
cityRouter.get("/:id", CityController.getCity);
cityRouter.get("/", CityController.getCities);
cityRouter.patch(
  "/:id",
  validateRequestBody(updateCitySchema),
  CityController.updateCity
);
cityRouter.delete("/:id", CityController.deleteCity);

export default cityRouter;
