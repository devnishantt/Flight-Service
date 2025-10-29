import logger from "../config/loggerConfig.js";
import { AppError, ConflictError, NotFoundError } from "../utils/errors.js";

export default class AirplaneService {
  constructor(airplaneRepository) {
    this.airplaneRepository = airplaneRepository;
  }

  async createAirplane(data) {
    try {
      //Validate Reqd fields
      if (!data.modelNumber || !data.capacity) {
        throw new AppError(`Model number and capacity are required!`, 400);
      }

      const existingAirplane = await this.airplaneRepository.findByModelNumber(
        data.modelNumber
      );
      if (existingAirplane) {
        throw new ConflictError(
          `Airplane with this model number already exist!`
        );
      }

      const airplane = await this.airplaneRepository.create(data);
      return airplane;
    } catch (error) {
      logger.error(`Err creating airplane: ${error}`);
      throw new AppError(`Cannot create a new airplane`, 500);
    }
  }

  async getAirplane(id) {
    try {
      const airplane = await this.airplaneRepository.findById(id);
      return airplane;
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      logger.error(`Error fetching airplane with ID ${id}:`, error);
      throw new AppError(`Cannot fetch airplane data`, 500);
    }
  }

  async getAirplanes(filter = {}) {
    try {
      const airplanes = await this.airplaneRepository.findAll(filter);
      return airplanes;
    } catch (error) {
      logger.error(`Error fetching airplanes: ${error}`);
      throw new AppError(`Cannot fetch airplanes data`, 500);
    }
  }

  async deleteAirplane(id) {
    try {
      const response = await this.airplaneRepository.delete(id);
      return response;
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      logger.error(`Error deleting airplane with id ${id}: ${error}`);
      throw new AppError(`Cannot delete airplane`, 500);
    }
  }

  async updateAirplane(id, data) {
    try {
      const airplane = await this.airplaneRepository.update(id, data);
      return airplane;
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      logger.error(`Error updating airplane with id ${id}:`, error.message);
      throw new AppError(`Cannot update airplane`, 500);
    }
  }
}
