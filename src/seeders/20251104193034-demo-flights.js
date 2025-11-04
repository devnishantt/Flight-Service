/** @type {import('sequelize-cli').Migration} */

import { Op } from "sequelize";

export async function up(queryInterface, Sequelize) {

  const airplanes = await queryInterface.sequelize.query(
    'SELECT id, modelNumber, capacity FROM airplanes WHERE modelNumber IN ("boeing777", "airbus340")',
    { type: Sequelize.QueryTypes.SELECT }
  );

  const airplaneMap = {};
  airplanes.forEach((airplane) => {
    airplaneMap[airplane.modelNumber] = {
      id: airplane.id,
      capacity: airplane.capacity,
    };
  });


  const airports = await queryInterface.sequelize.query(
    'SELECT id, code FROM airports WHERE code IN ("BOM", "DEL", "JFK")',
    { type: Sequelize.QueryTypes.SELECT }
  );

  const airportMap = {};
  airports.forEach((airport) => {
    airportMap[airport.code] = airport.id;
  });


  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(10, 0, 0, 0);

  const nextWeek = new Date(now);
  nextWeek.setDate(nextWeek.getDate() + 7);
  nextWeek.setHours(15, 30, 0, 0);

  const twoWeeksLater = new Date(now);
  twoWeeksLater.setDate(twoWeeksLater.getDate() + 14);
  twoWeeksLater.setHours(8, 0, 0, 0);


  const addHours = (date, hours) => {
    const result = new Date(date);
    result.setHours(result.getHours() + hours);
    return result;
  };

  await queryInterface.bulkInsert("flights", [
    {
      airplaneId: airplaneMap["boeing777"].id,
      departureAirportId: airportMap["BOM"],
      arrivalAirportId: airportMap["DEL"],
      departureTime: tomorrow,
      arrivalTime: addHours(tomorrow, 2),
      price: 3500.0,
      boardingGate: "A12",
      totalSeats: airplaneMap["boeing777"].capacity,
      availableSeats: airplaneMap["boeing777"].capacity - 50,
      createdAt: now,
      updatedAt: now,
    },
    {
      airplaneId: airplaneMap["airbus340"].id,
      departureAirportId: airportMap["BOM"],
      arrivalAirportId: airportMap["DEL"],
      departureTime: addHours(tomorrow, 6),
      arrivalTime: addHours(tomorrow, 8),
      price: 4200.0,
      boardingGate: "B05",
      totalSeats: airplaneMap["airbus340"].capacity,
      availableSeats: airplaneMap["airbus340"].capacity - 30,
      createdAt: now,
      updatedAt: now,
    },
    {
      airplaneId: airplaneMap["boeing777"].id,
      departureAirportId: airportMap["DEL"],
      arrivalAirportId: airportMap["BOM"],
      departureTime: nextWeek,
      arrivalTime: addHours(nextWeek, 2),
      price: 3800.0,
      boardingGate: "C18",
      totalSeats: airplaneMap["boeing777"].capacity,
      availableSeats: airplaneMap["boeing777"].capacity - 75,
      createdAt: now,
      updatedAt: now,
    },
    {
      airplaneId: airplaneMap["boeing777"].id,
      departureAirportId: airportMap["BOM"],
      arrivalAirportId: airportMap["JFK"],
      departureTime: twoWeeksLater,
      arrivalTime: addHours(twoWeeksLater, 16), 
      price: 65000.0,
      boardingGate: "A01",
      totalSeats: airplaneMap["boeing777"].capacity,
      availableSeats: airplaneMap["boeing777"].capacity - 120,
      createdAt: now,
      updatedAt: now,
    },
    {
      airplaneId: airplaneMap["boeing777"].id,
      departureAirportId: airportMap["JFK"],
      arrivalAirportId: airportMap["BOM"],
      departureTime: addHours(twoWeeksLater, 24), 
      arrivalTime: addHours(twoWeeksLater, 40), 
      price: 68000.0,
      boardingGate: "T5",
      totalSeats: airplaneMap["boeing777"].capacity,
      availableSeats: airplaneMap["boeing777"].capacity - 90,
      createdAt: now,
      updatedAt: now,
    },
    {
      airplaneId: airplaneMap["airbus340"].id,
      departureAirportId: airportMap["DEL"],
      arrivalAirportId: airportMap["JFK"],
      departureTime: addHours(nextWeek, 12),
      arrivalTime: addHours(nextWeek, 28), 
      price: 62000.0,
      boardingGate: "D22",
      totalSeats: airplaneMap["airbus340"].capacity,
      availableSeats: airplaneMap["airbus340"].capacity - 100,
      createdAt: now,
      updatedAt: now,
    },
    {
      airplaneId: airplaneMap["boeing777"].id,
      departureAirportId: airportMap["JFK"],
      arrivalAirportId: airportMap["DEL"],
      departureTime: addHours(nextWeek, 36),
      arrivalTime: addHours(nextWeek, 52), 
      price: 64000.0,
      boardingGate: "T8",
      totalSeats: airplaneMap["boeing777"].capacity,
      availableSeats: airplaneMap["boeing777"].capacity - 110,
      createdAt: now,
      updatedAt: now,
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  const airports = await queryInterface.sequelize.query(
    'SELECT id FROM airports WHERE code IN ("BOM", "DEL", "JFK")',
    { type: Sequelize.QueryTypes.SELECT }
  );

  const airportIds = airports.map((airport) => airport.id);

  if (airportIds.length > 0) {
    await queryInterface.bulkDelete("flights", {
      [Op.or]: [
        { departureAirportId: { [Op.in]: airportIds } },
        { arrivalAirportId: { [Op.in]: airportIds } },
      ],
    });
  }
}
