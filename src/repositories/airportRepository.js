import BaseRepository from "./baseRepository.js";
import { Airport } from "../models/index.js";

export default class AirportRepository extends BaseRepository {
  constructor() {
    super(Airport);
  }

  async findByCode(code) {
    return await this.findOne({ code });
  }

  async findByCityId(cityId) {
    return await this.findAll(cityId);
  }
}
