import { Router } from "express";
import { AirplaneController } from "../../controllers/index.js";
import { validateRequestBody } from "../../validators/index.js";
import {
  createAirplaneSchema,
  updateAirplaneSchema,
} from "../../validators/airplaneValidator.js";

const airplaneRouter = Router();

airplaneRouter.post(
  "/",
  validateRequestBody(createAirplaneSchema),
  AirplaneController.createAirplane
);
airplaneRouter.get("/:id", AirplaneController.getAirplane);
airplaneRouter.get("/", AirplaneController.getAirplanes);
airplaneRouter.patch(
  "/:id",
  validateRequestBody(updateAirplaneSchema),
  AirplaneController.updateAirplane
);
airplaneRouter.delete("/:id", AirplaneController.deleteAirplane);

export default airplaneRouter;
