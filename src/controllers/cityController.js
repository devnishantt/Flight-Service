import { CityRepository } from "../repositories/index.js";
import { CityService } from "../services/index.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";

const cityService = new CityService(new CityRepository());

export const createCity = asyncHandler(async (req, res) => {
  const city = await cityService.createCity(req.body);
  sendSuccess(res, city, `City created successfully`, 200);
});

export const getCity = asyncHandler(async (req, res) => {
  const city = await cityService.getCity(req.params.id);
  sendSuccess(res, city, `City fetched successfully`, 200);
});

export const getCities = asyncHandler(async (req, res) => {
  const cities = await cityService.getCities(req.query);
  sendSuccess(res, cities, `Cities fetched successfully`, 200);
});

export const updateCity = asyncHandler(async (req, res) => {
  const city = await cityService.updateCity(req.params.id, req.body, req.query);
  sendSuccess(res, city, `City updated successfully`, 200);
});

export const deleteCity = asyncHandler(async (req, res) => {
  await cityService.deleteCity(req.params.id, req.query);
  sendSuccess(res, null, `City deleted successfully`, 200);
});
