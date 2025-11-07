import { Flight } from "../models/index.js";
import BaseRepository from "./baseRepository.js";
import logger from "../config/loggerConfig.js";
import { AppError, NotFoundError } from "../utils/errors.js";

export default class FlightRepository extends BaseRepository {
  constructor() {
    super(Flight);
  }

  async findByAirplaneId(airplaneId) {
    return await this.findOne({ airplaneId });
  }

  async findByAirports(departureAirportId, arrivalAirportId) {
    return await this.findOne({ departureAirportId, arrivalAirportId });
  }

  async updateRemainingSeats(flightId, amount) {
    try {
      const flight = await this.findById(flightId);
      
      if (amount > 0) {
        await flight.increment("availableSeats", { by: amount });
      } else if (amount < 0) {
        await flight.decrement("availableSeats", { by: Math.abs(amount) });
      }
      
      await flight.reload();
      return flight;
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      logger.error(`Error updating remaining seats for Flight: ${error.message}`);
      throw new AppError(`Failed to update remaining seats for Flight`, 500, error);
    }
  }
}
