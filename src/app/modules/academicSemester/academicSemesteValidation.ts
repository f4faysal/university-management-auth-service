import { z } from 'zod';
import {
  academicSemesterCode,
  academicSemesterMonths,
  academicSemesterTitel,
} from './academicSemester.constant';

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitel] as [string, ...string[]], {
      required_error: 'Titel is required',
    }),
    year: z.string({ required_error: 'Year is required' }),
    code: z.enum([...academicSemesterCode] as [string, ...string[]], {
      required_error: 'Dode is required',
    }),
    startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'Start Month is required',
    }),
    endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'End Month is required',
    }),
  }),
});

const updateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...academicSemesterTitel] as [string, ...string[]], {
          required_error: 'Titel is required',
        })
        .optional(),
      year: z.string({ required_error: 'Year is required' }).optional(),
      code: z
        .enum([...academicSemesterCode] as [string, ...string[]], {
          required_error: 'Dode is required',
        })
        .optional(),
      startMonth: z
        .enum([...academicSemesterMonths] as [string, ...string[]], {
          required_error: 'Start Month is required',
        })
        .optional(),
      endMonth: z
        .enum([...academicSemesterMonths] as [string, ...string[]], {
          required_error: 'End Month is required',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.year && !data.body.code),
    {
      message: 'Either both Tital and Code should be provide or neither',
    }
  );

// req-valodation
// dnody --> objact
// data --> objact

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
};
