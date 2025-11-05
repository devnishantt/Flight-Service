import z from "zod";

export const createAirportSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Airport name must be at least 2 characters long" })
    .max(100, { message: "Airport name must not exceed 100 characters" })
    .regex(/^[a-zA-Z ]+$/, {
      message:
        "Airport name must contain only alphabetic characters and spaces",
    }),
  code: z
    .string()
    .length(3, { message: "Airport code must be exactly 3 characters" })
    .regex(/^[A-Za-z]{3}$/, {
      message: "Airport code must be exactly 3 uppercase letters",
    })
    .transform((val) => val.toUpperCase()),
  cityId: z
    .number({ invalid_type_error: "City ID must be a number" })
    .int({ message: "City ID must be an integer" })
    .positive({ message: "City ID must be a positive number" }),
  address: z
    .string()
    .max(500, { message: "Address must not exceed 500 characters" })
    .optional(),
});


export const updateAirportSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Airport name must be at least 2 characters long" })
      .max(100, { message: "Airport name must not exceed 100 characters" })
      .regex(/^[a-zA-Z ]+$/, {
        message:
          "Airport name must contain only alphabetic characters and spaces",
      })
      .optional(),
    code: z
      .string()
      .length(3, { message: "Airport code must be exactly 3 characters" })
      .regex(/^[A-Z]{3}$/, {
        message: "Airport code must be exactly 3 uppercase letters",
      })
      .transform((val) => val.toUpperCase())
      .optional(),
    cityId: z
      .number({ invalid_type_error: "City ID must be a number" })
      .int({ message: "City ID must be an integer" })
      .positive({ message: "City ID must be a positive number" })
      .optional(),
    address: z
      .string()
      .max(500, { message: "Address must not exceed 500 characters" })
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });
