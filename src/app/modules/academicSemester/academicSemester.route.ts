import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemesteValidation';
import { AcademicSemesterController } from './academicSemester.controller';

const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester
);

router.get('/:id', AcademicSemesterController.getSingleSemester);
router.get('/', AcademicSemesterController.getAllSemesters);
router.patch(
  '/update-semester/:id',
  validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateSemesters
);
router.delete('/delete/:id', AcademicSemesterController.deleteSemesters);

export const SemesterRoutes = router;

// test
