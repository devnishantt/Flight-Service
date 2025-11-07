import { Router } from "express";
import { FlightController } from "../../controllers/index.js";
import { validateRequestBody } from "../../validators/index.js"
import {createFlightSchema, updateFlightSchema, updateRemainingSeatsSchema} from "../../validators/flightValidator.js";

const flightRouter = Router();

flightRouter.post("/", validateRequestBody(createFlightSchema), FlightController.createFlight);
flightRouter.get("/", FlightController.getFlights);
flightRouter.get("/:id", FlightController.getFlight);
flightRouter.patch("/:id", validateRequestBody(updateFlightSchema), FlightController.updateFlight);
flightRouter.patch("/:id/remaining-seats", validateRequestBody(updateRemainingSeatsSchema), FlightController.updateRemainingSeats);

flightRouter.delete("/:id", FlightController.deleteFlight);

export default flightRouter;