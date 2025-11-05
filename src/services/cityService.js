import { ConflictError } from "../utils/errors.js";

export default class CityService {
  constructor(cityRepository) {
    this.cityRepository = cityRepository;
  }

  async createCity(data) {
    const existingCity = await this.cityRepository.findByNameAndStateCountry(
      data.name,
      data.state || null,
      data.country
    );
    if (existingCity) {
      throw new ConflictError(
        `City with ${data.name}${data.state ? `${data.state}` : ""}, ${
          data.country
        } already exists.`
      );
    }
    return await this.cityRepository.create(data);
  }

  async getCity(id) {
    return await this.cityRepository.findById(id);
  }

  async getCities(filter = {}) {
    return await this.cityRepository.findAll(filter);
  }

  async updateCity(id, data, options = {}) {
    const currentCity = await this.cityRepository.findById(id);

    const nameToCheck = data.name || currentCity.name;
    const stateToCheck =
      (data.state !== undefined ? data.state : currentCity.state) || null;
    const countryToCheck = data.country || currentCity.country;

    const existingCity = await this.cityRepository.findByNameAndStateCountry(
      nameToCheck,
      stateToCheck,
      countryToCheck
    );

    if (existingCity && existingCity.id !== parseInt(id)) {
      throw new ConflictError(
        `City "${nameToCheck}"${
          stateToCheck ? `, ${stateToCheck}` : ""
        }, ${countryToCheck} already exists!`
      );
    }

    return await this.cityRepository.update(id, data, options);
  }

  async deleteCity(id, options = {}) {
    return await this.cityRepository.delete(id, options);
  }
}
