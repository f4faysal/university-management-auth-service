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
    year: z.number({ required_error: 'Year is required' }),
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
// req-valodation
// dnody --> objact
// data --> objact
export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
};
