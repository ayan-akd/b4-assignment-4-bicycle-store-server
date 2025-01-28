import { z } from 'zod';

export const orderValidationSchema = z.object({
  body: z.object({
    user: z.string({
      required_error: 'User ID is required',
      invalid_type_error: 'user must be a valid mongoose id',
    }),

    product: z.string({
      required_error: 'Product ID is required',
      invalid_type_error: 'Product ID must be a string',
    }),

    quantity: z
      .number({
        required_error: 'Quantity is required',
        invalid_type_error: 'Quantity must be a positive integer',
      })
      .int('Quantity must be an integer')
      .positive('Quantity must be a positive integer'),

    totalPrice: z
      .number({
        required_error: 'Total Price is required',
        invalid_type_error: 'Total Price must be a positive number',
      })
      .positive('Total Price must be a positive number'),

    address: z.string({
      required_error: 'Address is required',
      invalid_type_error: 'Address must be a string',
    }),
  }),
});

export const orderStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([
      'pending',
      'shipped',
      'delivered',
      'paid',
      'cancelled',
    ]),
  }),
});