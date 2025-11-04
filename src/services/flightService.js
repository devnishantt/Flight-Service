import {
  AirplaneRepository,
  AirportRepository,
} from "../repositories/index.js";
import { ValidationError } from "../utils/errors.js";

export default class FlightService {
  constructor(flightRepository) {
    (this.flightRepository = flightRepository),
      (this.airplaneRepository = new AirplaneRepository());
    this.airportRepository = new AirportRepository();
  }

  async createFlight(data) {
    if (data.departureAirportId === data.arrivalAirportId) {
      throw new ValidationError(`Departure and arrival airport cannot be same`);
    }

    const departureTime = new Date(data.departureTime);
    const arrivalTime = new Date(data.arrivalTime);
    if (arrivalTime <= departureTime) {
      throw new ValidationError(`Arrival time must be after departure time`);
    }

    const airplane = await this.airplaneRepository.findById(data.airplaneId);

    await this.airportRepository.findById(data.departureAirportId);

    await this.airportRepository.findById(data.arrivalAirportId);

    if (!data.totalSeats) {
      data.totalSeats = airplane.capacity;
    }

    if (data.availableSeats > data.totalSeats) {
      throw new ValidationError(`Availabe seats cannot exceed total seats`);
    }

    return await this.flightRepository.create(data);
  }

  async getFlight(id, options = {}) {
    return await this.flightRepository.findById(id, options);
  }

  async getFlights(filter = {}) {
    return await this.flightRepository.findAll(filter);
  }

  async updateFlight(id, data, options = {}) {
    const currentFlight = await this.flightRepository.findById(id);

    if (
      data.departureAirportId !== undefined &&
      data.arrivalAirportId !== undefined
    ) {
      if (data.departureAirportId === data.arrivalAirportId) {
        throw new ValidationError(
          "Departure and arrival airports cannot be the same!"
        );
      }
    } else if (data.departureAirportId !== undefined) {
      if (data.departureAirportId === currentFlight.arrivalAirportId) {
        throw new ValidationError(
          "Departure and arrival airports cannot be the same!"
        );
      }
    } else if (data.arrivalAirportId !== undefined) {
      if (data.arrivalAirportId === currentFlight.departureAirportId) {
        throw new ValidationError(
          "Departure and arrival airports cannot be the same!"
        );
      }
    }

    if (data.departureTime !== undefined || data.arrivalTime !== undefined) {
      const departureTime = data.departureTime
        ? new Date(data.departureTime)
        : new Date(currentFlight.departureTime);
      const arrivalTime = data.arrivalTime
        ? new Date(data.arrivalTime)
        : new Date(currentFlight.arrivalTime);

      if (arrivalTime <= departureTime) {
        throw new ValidationError("Arrival time must be after departure time!");
      }
    }

    if (data.airplaneId) {
      await this.airplaneRepository.findById(data.airplaneId);
    }

    // Validate airports exist if updating
    if (data.departureAirportId) {
      await this.airportRepository.findById(data.departureAirportId);
    }
    if (data.arrivalAirportId) {
      await this.airportRepository.findById(data.arrivalAirportId);
    }

    // Validate availableSeats doesn't exceed totalSeats
    if (data.availableSeats !== undefined) {
      const totalSeats =
        data.totalSeats !== undefined
          ? data.totalSeats
          : currentFlight.totalSeats;
      if (data.availableSeats > totalSeats) {
        throw new ValidationError("Available seats cannot exceed total seats!");
      }
    }

    return await this.flightRepository.update(id, data, options);
  }

  async deleteFlight(id, options = {}) {
    return await this.flightRepository.delete(id, options);
  }
}
