import { Router } from "express";
import { AirplaneController } from "../../controllers/index.js";

const airplaneRouter = Router();

airplaneRouter.post("/", AirplaneController.createAirplane);

export default airplaneRouter;
