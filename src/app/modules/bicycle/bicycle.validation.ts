import { z } from 'zod';

export const createBicycleValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    }),
    brand: z.string({
      required_error: 'Brand is required',
      invalid_type_error: 'Brand must be a string',
    }),
    price: z
      .number({
        required_error: 'Price is required',
        invalid_type_error: 'Price must be a positive number',
      })
      .positive('Price must be a positive number'),
    category: z.enum(['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'], {
      required_error: 'Category is required',
      invalid_type_error:
        'Category must be one of Mountain, Road, Hybrid, BMX, or Electric',
    }),
    description: z.string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string',
    }),
    quantity: z
      .number({
        required_error: 'Quantity is required',
        invalid_type_error: 'Quantity must be a positive integer',
      })
      .int('Quantity must be an integer')
      .positive('Quantity must be a positive integer'),
    inStock: z.boolean({
      required_error: 'inStock is required',
      invalid_type_error: 'inStock must be a boolean value',
    }),
  }),
});
export const updateBicycleValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    }),
    brand: z.string({
      required_error: 'Brand is required',
      invalid_type_error: 'Brand must be a string',
    }),
    price: z
      .number({
        required_error: 'Price is required',
        invalid_type_error: 'Price must be a positive number',
      })
      .positive('Price must be a positive number'),
    category: z.enum(['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'], {
      required_error: 'Category is required',
      invalid_type_error:
        'Category must be one of Mountain, Road, Hybrid, BMX, or Electric',
    }),
    description: z.string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string',
    }),
    quantity: z
      .number({
        required_error: 'Quantity is required',
        invalid_type_error: 'Quantity must be a non-negative integer',
      })
      .int('Quantity must be an integer')
      .min(0, 'Quantity must be 0 or greater'),
    inStock: z.boolean({
      required_error: 'inStock is required',
      invalid_type_error: 'inStock must be a boolean value',
    }),
  }),
});
