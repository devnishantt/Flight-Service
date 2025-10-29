import { Airplane } from "../models/index.js";
import { BaseRepository } from "./baseRepository.js";

export default class AirplaneRepository extends BaseRepository {
  constructor() {
    super(Airplane);
  }

  async findByModelNumber(modelNumber) {
    return this.findOne({ modelNumber });
  }
}
