import { Flight } from "../models/index.js";
import BaseRepository from "./baseRepository.js";
import logger from "../config/loggerConfig.js";
import { AppError, NotFoundError } from "../utils/errors.js";
import sequelize from "../models/sequelize.js";

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
    const transaction = await sequelize.transaction();
    try {
      const flight = await this.model.findByPk(flightId, {
        lock: transaction.LOCK.UPDATE,
        transaction,
      });

      if (!flight) {
        await transaction.rollback();
        throw new NotFoundError(`Flight with ID: ${flightId} not found!`);
      }

      if (amount > 0) {
        await flight.increment("availableSeats", { by: amount, transaction });
      } else if (amount < 0) {
        await flight.decrement("availableSeats", {
          by: Math.abs(amount),
          transaction,
        });
      }

      await flight.reload({ transaction });
      await transaction.commit();
      return flight;
    } catch (error) {
      await transaction.rollback();
      if (error instanceof NotFoundError) throw error;
      logger.error(
        `Error updating remaining seats for Flight: ${error.message}`
      );
      throw new AppError(
        `Failed to update remaining seats for Flight`,
        500,
        error
      );
    }
  }
}
