import logger from "../config/loggerConfig.js";
import { AppError, ConflictError, NotFoundError } from "../utils/errors.js";

export default class AirplaneService {
  constructor(airplaneRepository) {
    this.airplaneRepository = airplaneRepository;
  }

  async createAirplane(data) {
    const existingAirplane = await this.airplaneRepository.findByModelNumber(
      data.modelNumber
    );
    if (existingAirplane) {
      throw new ConflictError(`Airplane with this model number already exist!`);
    }

    return await this.airplaneRepository.create(data);
  }

  async getAirplane(id) {
    const airplane = await this.airplaneRepository.findById(id);
    return airplane;
  }

  async getAirplanes(filter = {}) {
    return await this.airplaneRepository.findAll(filter);
  }

  async deleteAirplane(id) {
    return await this.airplaneRepository.delete(id);
  }

  async updateAirplane(id, data) {
    return await this.airplaneRepository.update(id, data);
  }
}
