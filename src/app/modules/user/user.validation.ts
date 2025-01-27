import { z } from 'zod';
import { UserStatus } from './user.constant';

const userValidationSchema = z.object({
  password: z.string({
    invalid_type_error: 'Password must be string',
  }),
});

const createUserValidationSchema = z.object({
  body: z.object({
    password: userValidationSchema.shape.password,
    role: z.enum(['admin', 'customer']),
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email(),
  }),
});

const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});

export const UserValidation = {
  userValidationSchema,
  changeStatusValidationSchema,
  createUserValidationSchema,
};
