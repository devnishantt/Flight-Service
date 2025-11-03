import { Router } from "express";
import { AirportController } from "../../controllers/index.js";
import { validateRequestBody } from "../../validators/index.js";
import { createAirplaneSchema } from "../../validators/airplaneValidator.js";
import { updateAirportSchema } from "../../validators/airportValidator.js";

const airportRouter = Router();

airportRouter.post(
  "/",
  validateRequestBody(createAirplaneSchema),
  AirportController.createAirport
);
airportRouter.get("/:id", AirportController.getAirport);
airportRouter.get("/", AirportController.getAirports);
airportRouter.patch(
  "/",
  validateRequestBody(updateAirportSchema),
  AirportController.updateAirport
);
airportRouter.delete("/:id", AirportController.deleteAirport);

export default airportRouter;
