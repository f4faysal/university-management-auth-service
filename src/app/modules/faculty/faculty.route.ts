import express from 'express';
import { FacultyController } from './faculty.controller';

const router = express.Router();

// router.get('/:id', FacultyController.getSingleStudent);
router.get('/', FacultyController.getAllFaculty);
// router.patch(
//      '/:id',
//      // validateRequest(StudentValidation.studentUpdateZodSchema),
//      FacultyController.updateSudent
// );
// router.delete('/:id', FacultyController.deleteStudent);

// // router.post(
// //   '/create-student',
// //   validateRequest(UserValidation.createdUserZodSchema),
// //   UserController.createStudent
// // );

export const FacultyRoutes = router;
