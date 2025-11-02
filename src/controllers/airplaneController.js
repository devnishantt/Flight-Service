import { AirplaneRepository } from "../repositories/index.js";
import { AirplaneService } from "../services/index.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";

const airplaneService = new AirplaneService(new AirplaneRepository());

export const createAirplane = asyncHandler(async (req, res) => {
  const airplane = await airplaneService.createAirplane(req.body);
  sendSuccess(res, airplane, `Airplane created successfully`, 201);
});

export const getAirplane = asyncHandler(async (req, res) => {
  const airplane = await airplaneService.getAirplane(req.params.id);
  sendSuccess(res, airplane, `Airplane fetched successfully`, 200);
});

export const getAirplanes = asyncHandler(async (req, res) => {
  const airplanes = await airplaneService.getAirplanes(req.query);
  sendSuccess(res, airplanes, `Airplanes fetched successfully`, 200);
});

export const updateAirplane = asyncHandler(async (req, res) => {
  const airplane = await airplaneService.updateAirplane(
    req.params.id,
    req.body,
    req.query
  );
  sendSuccess(res, airplane, `Airplane updated successfully`, 200);
});

export const deleteAirplane = asyncHandler(async (req, res) => {
  await airplaneService.deleteAirplane(
    req.params.id,
    req.query
  );
  sendSuccess(res, null, `Airplane deleted successfully`, 200);
});
