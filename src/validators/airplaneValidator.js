import z from "zod";

export const createAirplaneSchema = z.object({
  modelNumber: z
    .string()
    .min(3, { message: `Model number must be at least 3 characters long` })
    .max(50, { message: `Model number must not exceed 50 char` })
    .regex(/^[a-zA-Z0-9 ]*$/, {
      message: `Model number must contain only alphanumeric characters`,
    }),
  capacity: z
    .number({ invalid_type_error: `Capacity must be a number` })
    .int(`Capacity must be an integer`)
    .min(1, `Capacity must be at least 1`)
    .max(1000, { message: `Capacity must not exceed 1000` }),
});
