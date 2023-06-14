import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ManagementDepartmentController } from './managementDepartment.Controller';
import { ManagementDepartmentValidation } from './managementDepartment.Validation';

const router = express.Router();
router.post(
  '/create-management',
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.createManagementDepartment
);

router.get('/', ManagementDepartmentController.getAllManagementDepartments);

router.get(
  '/:id',
  ManagementDepartmentController.getSinglelManagementDepartment
);

router.patch(
  '/:id',
  validateRequest(
    ManagementDepartmentValidation.updateManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.updateManagementDepartment
);

export const ManagementDepartmentRoutes = router;
