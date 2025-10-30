import logger from "../config/loggerConfig.js";
import { AirplaneRepository } from "../repositories/index.js";
import { AirplaneService } from "../services/index.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendError, sendSuccess } from "../utils/response.js";

const airplaneService = new AirplaneService(new AirplaneRepository());

export const createAirplane = asyncHandler(async (req, res) => {
    const airplane = await airplaneService.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    sendSuccess(res, airplane, `Airplane created successfully`, 201);
  
});
