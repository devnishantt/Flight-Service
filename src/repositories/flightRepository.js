import { Flights } from "../models/index.js";
import BaseRepository from "./baseRepository.js";

export default class FlightRepository extends BaseRepository {
  constructor() {
    super(Flights);
  }

  async findByAirplaneId(airplaneId) {
    return await this.findOne({ airplaneId });
  }

  async findByAirports(departureAirportId, arrivalAirportId) {
    return await this.findOne({ departureAirportId, arrivalAirportId });
  }
}
