/**
 * Middleware for validating request body against provided zod schema.
 * Usage in routes: router.post("/", validateRequestBody(myschema), handler)
 */

import logger from "../config/loggerConfig.js";
import { sendError } from "../utils/response.js";

export function makeValidator(parseMethod) {
  return (schema) => (req, res, next) => {
    const result = schema.safeParse(req[parseMethod]);
    if (!result.success) {
      const errMessages =
        result.error.issues?.map((issue) => issue.message) || [];
      logger.warn(`Validation error in ${parseMethod}: ${errMessages}`);

      return sendError(res, `Validation failed`, 400, errMessages);
    }

    req[parseMethod] = result.data;
    return next();
  };
}

export const validateRequestBody = makeValidator("body");
export const validateQueryParams = makeValidator("query");
export const validateParams = makeValidator("params");
