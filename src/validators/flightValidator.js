import z from "zod";

export const createFlightSchema = z
  .object({
    airplaneId: z
      .number({ invalid_type_error: "Airplane ID must be a number" })
      .int({ message: "Airplane ID must be an integer" })
      .positive({ message: "Airplane ID must be a positive number" }),
    departureAirportId: z
      .number({ invalid_type_error: "Departure airport ID must be a number" })
      .int({ message: "Departure airport ID must be an integer" })
      .positive({
        message: "Departure airport ID must be a positive number",
      }),
    arrivalAirportId: z
      .number({ invalid_type_error: "Arrival airport ID must be a number" })
      .int({ message: "Arrival airport ID must be an integer" })
      .positive({ message: "Arrival airport ID must be a positive number" }),
    departureTime: z.coerce.date({
      required_error: "Departure time is required",
      invalid_type_error: "Departure time must be a valid date",
    }),
    arrivalTime: z.coerce.date({
      required_error: "Arrival time is required",
      invalid_type_error: "Arrival time must be a valid date",
    }),
    price: z
      .number({ invalid_type_error: "Price must be a number" })
      .positive({ message: "Price must be a positive number" })
      .max(999999.99, { message: "Price must not exceed 999999.99" }),
    boardingGate: z
      .string()
      .max(10, { message: "Boarding gate must not exceed 10 characters" })
      .optional(),
    totalSeats: z
      .number({ invalid_type_error: "Total seats must be a number" })
      .int({ message: "Total seats must be an integer" })
      .min(1, { message: "Total seats must be at least 1" })
      .max(1000, { message: "Total seats must not exceed 1000" })
      .optional(),
    availableSeats: z
      .number({ invalid_type_error: "Available seats must be a number" })
      .int({ message: "Available seats must be an integer" })
      .min(0, { message: "Available seats must be at least 0" })
      .max(1000, { message: "Available seats must not exceed 1000" })
      .optional(),
  })
  .refine((data) => data.departureAirportId !== data.arrivalAirportId, {
    message: "Departure and arrival airports cannot be the same",
    path: ["arrivalAirportId"],
  })
  .refine(
    (data) => {
      const departureTime = new Date(data.departureTime);
      const arrivalTime = new Date(data.arrivalTime);
      return arrivalTime > departureTime;
    },
    {
      message: "Arrival time must be after departure time",
      path: ["arrivalTime"],
    }
  )
  .refine(
    (data) => {
      if (data.totalSeats !== undefined && data.availableSeats !== undefined) {
        return data.availableSeats <= data.totalSeats;
      }
      return true;
    },
    {
      message: "Available seats cannot exceed total seats",
      path: ["availableSeats"],
    }
  );

export const updateFlightSchema = z
  .object({
    airplaneId: z
      .number({ invalid_type_error: "Airplane ID must be a number" })
      .int({ message: "Airplane ID must be an integer" })
      .positive({ message: "Airplane ID must be a positive number" })
      .optional(),
    departureAirportId: z
      .number({ invalid_type_error: "Departure airport ID must be a number" })
      .int({ message: "Departure airport ID must be an integer" })
      .positive({
        message: "Departure airport ID must be a positive number",
      })
      .optional(),
    arrivalAirportId: z
      .number({ invalid_type_error: "Arrival airport ID must be a number" })
      .int({ message: "Arrival airport ID must be an integer" })
      .positive({ message: "Arrival airport ID must be a positive number" })
      .optional(),
    departureTime: z.coerce
      .date({
        invalid_type_error: "Departure time must be a valid date",
      })
      .optional(),
    arrivalTime: z.coerce
      .date({
        invalid_type_error: "Arrival time must be a valid date",
      })
      .optional(),
    price: z
      .number({ invalid_type_error: "Price must be a number" })
      .positive({ message: "Price must be a positive number" })
      .max(999999.99, { message: "Price must not exceed 999999.99" })
      .optional(),
    boardingGate: z
      .string()
      .max(10, { message: "Boarding gate must not exceed 10 characters" })
      .optional(),
    totalSeats: z
      .number({ invalid_type_error: "Total seats must be a number" })
      .int({ message: "Total seats must be an integer" })
      .min(1, { message: "Total seats must be at least 1" })
      .max(1000, { message: "Total seats must not exceed 1000" })
      .optional(),
    availableSeats: z
      .number({ invalid_type_error: "Available seats must be a number" })
      .int({ message: "Available seats must be an integer" })
      .min(0, { message: "Available seats must be at least 0" })
      .max(1000, { message: "Available seats must not exceed 1000" })
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  })
  .refine(
    (data) => {
      if (
        data.departureAirportId !== undefined &&
        data.arrivalAirportId !== undefined
      ) {
        return data.departureAirportId !== data.arrivalAirportId;
      }
      return true;
    },
    {
      message: "Departure and arrival airports cannot be the same",
      path: ["arrivalAirportId"],
    }
  )
  .refine(
    (data) => {
      if (data.departureTime !== undefined && data.arrivalTime !== undefined) {
        const departureTime = new Date(data.departureTime);
        const arrivalTime = new Date(data.arrivalTime);
        return arrivalTime > departureTime;
      }
      return true;
    },
    {
      message: "Arrival time must be after departure time",
      path: ["arrivalTime"],
    }
  )
  .refine(
    (data) => {
      if (data.totalSeats !== undefined && data.availableSeats !== undefined) {
        return data.availableSeats <= data.totalSeats;
      }
      return true;
    },
    {
      message: "Available seats cannot exceed total seats",
      path: ["availableSeats"],
    }
  );
