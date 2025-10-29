import logger from "../config/loggerConfig.js";
import { AirplaneRepository } from "../repositories/index.js";
import { AirplaneService } from "../services/index.js";
import { sendError, sendSuccess } from "../utils/response.js";

const airplaneService = new AirplaneService(new AirplaneRepository());

export async function createAirplane(req, res) {
  try {
    const airplane = await airplaneService.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    sendSuccess(res, airplane, `Airplane created successfully`, 201);
  } catch (error) {
    logger.error(`Error in createAirplane controller: ${error}`);
    sendError(
      res,
      `Failed to create airplane`,
      error.statusCode || 500,
      error.explaination || error.message
    );
  }
}
