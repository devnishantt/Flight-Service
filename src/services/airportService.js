import { CityRepository } from "../repositories/index.js";
import { ConflictError } from "../utils/errors.js";

export default class AirportService {
  constructor(airportRepository) {
    this.airportRepository = airportRepository;
    this.cityRepository = new CityRepository();
  }

  async createAirport(data) {
    const existingAirport = await this.airportRepository.findByCode(data.code);
    if (existingAirport) {
      throw new ConflictError(`Airport with code ${data.code} already exists!`);
    }
    await this.cityRepository.findById(data.cityId);
    return await this.airportRepository.create(data);
  }

  async getAirport(id, options = {}) {
    return await this.airportRepository.findById(id, options);
  }

  async getAirports(filter = {}) {
    return this.airportRepository.findAll(filter);
  }

  async updateAirport(id, data, options = {}) {
    const currentAirport = await this.airportRepository.findById(id);

    if (data.code) {
      const codeToCheck = data.code || currentAirport.code;
      const existingAirport = await this.airportRepository.findByCode(
        codeToCheck
      );

      if (existingAirport && existingAirport.id !== parseInt(id)) {
        throw new ConflictError(
          `Airport with code ${codeToCheck} already exists`
        );
      }
      if (data.cityId) {
        await this.cityRepository.findById(data.cityId);
      }

      return await this.airportRepository.update(id, data, options);
    }
  }

  async deleteAirport(id, options = {}) {
    return await this.airportRepository.delete(id, options);
  }
}
