import { AirportRepository } from "../repositories/index.js";
import AirportService from "../services/airportService.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";

const airportService = new AirportService(new AirportRepository());

export const createAirport = asyncHandler(async (req, res) => {
  const airport = await airportService.createAirport(req.body);
  sendSuccess(res, airport, `Airport created successfully`, 201);
});

export const getAirport = asyncHandler(async (req, res) => {
  const airport = await airportService.getAirport(req.params.id, req.query);
  sendSuccess(res, airport, `Airport fetched successfully`, 200);
});

export const getAirports = asyncHandler(async (req, res) => {
  const airports = await airportService.getAirports(req.query);
  sendSuccess(res, airports, `Airports fetched successfully`, 200);
});

export const updateAirport = asyncHandler(async (req, res) => {
  const airport = await airportService.updateAirport(
    req.params.id,
    req.body,
    req.query
  );
  sendSuccess(res, airport, `Airport updated successfully`, 200);
});

export const deleteAirport = asyncHandler(async (req, res) => {
  await airportService.deleteAirport(req.params.id, req.query);
  sendSuccess(res, null, `Airport deleted successfully`, 200);
});
