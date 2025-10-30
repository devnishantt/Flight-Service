import { Router } from "express";
import { AirplaneController } from "../../controllers/index.js";
import { validateRequestBody } from "../../validators/index.js";
import { createAirplaneSchema } from "../../validators/airplaneValidator.js";

const airplaneRouter = Router();

airplaneRouter.post(
  "/",
  validateRequestBody(createAirplaneSchema),
  AirplaneController.createAirplane
);

export default airplaneRouter;
