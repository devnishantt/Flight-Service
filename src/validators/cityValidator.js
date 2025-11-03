import z from "zod";

export const createCitySchema = z.object({
  name: z
    .string()
    .min(2, { message: "City name must be at least 2 characters long" })
    .max(100, { message: "City name must not exceed 100 charaters" })
    .regex(/^[a-zA-Z ]+*$/, {
      message: "City name must contain only alphabetic characters and spaces",
    }),
  state: z
    .string()
    .min(2, { message: "State name must be at least 2 characters long" })
    .max(100, { message: "State name must not exceed 100 characters" })
    .regex(/^[a-zA-Z ]+*$/, {
      message: "State name must only contain alphabetic characters and spaces",
    })
    .optional(),
  country: z
    .string()
    .min(2, { message: "Country name must be at least 2 characters long" })
    .max(100, { message: "Country name must not exceed 100 characters" })
    .regex(/^[a-zA-Z ]+$/, {
      message:
        "Country name must contain only alphabetic characters and spaces",
    }),
});

export const updateCitySchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "City name must be at least 2 characters long" })
      .max(100, { message: "City name must not exceed 100 characters" })
      .regex(/^[a-zA-Z ]+$/, {
        message: "City name must contain only alphabetic characters and spaces",
      })
      .optional(),
    state: z
      .string()
      .min(2, { message: "State name must be at least 2 characters long" })
      .max(100, { message: "State name must not exceed 100 characters" })
      .regex(/^[a-zA-Z\s]+$/, {
        message:
          "State name must contain only alphabetic characters and spaces",
      })
      .optional(),
    country: z
      .string()
      .min(2, { message: "Country name must be at least 2 characters long" })
      .max(100, { message: "Country name must not exceed 100 characters" })
      .regex(/^[a-zA-Z ]+$/, {
        message:
          "Country name must contain only alphabetic characters and spaces",
      })
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });
