import Joi from "joi";

export const responseSchema = Joi.object({});

export interface IResponseSchema {
  [key: keyof any]: never;
}

