import { Router } from "express";
import { AirportController } from "../../controllers/index.js";
import { validateRequestBody } from "../../validators/index.js";
import { createAirportSchema, updateAirportSchema } from "../../validators/airportValidator.js";

const airportRouter = Router();

airportRouter.post(
  "/",
  validateRequestBody(createAirportSchema),
  AirportController.createAirport
);
airportRouter.get("/:id", AirportController.getAirport);
airportRouter.get("/", AirportController.getAirports);
airportRouter.patch(
  "/:id",
  validateRequestBody(updateAirportSchema),
  AirportController.updateAirport
);
airportRouter.delete("/:id", AirportController.deleteAirport);

export default airportRouter;
