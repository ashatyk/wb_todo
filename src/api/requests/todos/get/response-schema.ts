import Joi from 'joi';

export const responseSchema = Joi.object({
  todos: Joi.array().items(
    Joi.object({
      id: Joi.string().required(),
      title: Joi.string().optional(),
      completed: Joi.boolean().required(),
      createdAt: Joi.date().required(),
    }),
  ),
});

export interface IResponseSchema {
  todos: {
    id: string;
    title: string;
    description: string;
    createAt: string;
    completed: boolean;
  }[];
}
