import { FlightRepository } from "../repositories/index.js";
import FlightService from "../services/flightService.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";

const flightService = new FlightService(new FlightRepository());

export const createFlight = asyncHandler(async (req, res) => {
  const flight = await flightService.createFlight(req.body);
  sendSuccess(res, flight, `Flight created successfully`, 201);
});

export const getFlight = asyncHandler(async (req, res) => {
  const flight = await flightService.getFlight(req.params.id, req.query);
  sendSuccess(res, flight, `Flight fetched successfully`, 200);
});

export const getFlights = asyncHandler(async (req, res) => {
  const flights = await flightService.getFlights(req.query);
  sendSuccess(res, flights, `Flights fetched successfully`, 200);
});

export const updateFlight = asyncHandler(async (req, res) => {
  const flight = await flightService.updateFlight(
    req.params.id,
    req.body,
    req.query
  );
  sendSuccess(res, flight, `Flight updated successfully`, 200);
});

export const deleteFlight = asyncHandler(async (req, res) => {
  await flightService.deleteFlight(req.params.id, req.query);
  sendSuccess(res, null, `Flight deleted successfully`, 200);
});

export const updateRemainingSeats = asyncHandler(async (req, res) => {
  const flight = await flightService.updateRemainingSeats(
    req.params.id,
    req.body.amount
  );
  sendSuccess(res, flight, `Flight remaining seats updated successfully`, 200);
});
