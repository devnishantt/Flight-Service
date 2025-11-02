import { City } from "../models/index.js";
import BaseRepository from "./baseRepository.js";

export default class CityRepository extends BaseRepository {
  constructor() {
    super(City);
  }

  async findByNameAndStateCountry(name, state = null, country) {
    return await this.findOne({ name, state, country });
  }

  async findByState(state) {
    return await this.findAll(state);
  }

  async findByCountry(country) {
    return await this.findAll(country);
  }
}
