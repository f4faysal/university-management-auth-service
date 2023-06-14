import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentsController } from './student.controller';
import { StudentValidation } from './student.validation';

const router = express.Router();

router.get('/:id', StudentsController.getSingleStudent);
router.get('/', StudentsController.getAllStudents);
router.patch(
  '/:id',
  validateRequest(StudentValidation.studentUpdateZodSchema),
  StudentsController.updateSudent
);
router.delete('/:id', StudentsController.deleteStudent);

// router.post(
//   '/create-student',
//   validateRequest(UserValidation.createdUserZodSchema),
//   UserController.createStudent
// );

export const StudentRoutes = router;
