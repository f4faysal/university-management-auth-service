import { z } from 'zod';

const createFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Titel is required',
    }),
  }),
});

const updatefacultyZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Titel is required',
    }),
  }),
});

export const AcademicFacultyValidation = {
  createFacultyZodSchema,
  updatefacultyZodSchema,
};
