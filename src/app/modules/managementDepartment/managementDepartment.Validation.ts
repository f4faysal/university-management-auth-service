import { z } from 'zod';

const createManagementDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Titel is required',
    }),
  }),
});

const updateManagementDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Titel is required',
    }),
  }),
});

export const ManagementDepartmentValidation = {
  updateManagementDepartmentZodSchema,
  createManagementDepartmentZodSchema,
};
