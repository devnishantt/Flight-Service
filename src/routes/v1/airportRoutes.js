import { Router } from "express";
import { AirportController } from "../../controllers/index.js";

const airportRouter = Router();

airportRouter.post("/", AirportController.createAirport);
airportRouter.get("/:id", AirportController.getAirport);
airportRouter.get("/", AirportController.getAirports);
airportRouter.patch("/", AirportController.updateAirport);
airportRouter.delete("/:id", AirportController.deleteAirport);

export default airportRouter;
