import express from 'express';
import { SemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semester',
    route: SemesterRoutes,
  },
];

moduleRutes.forEach(route => router.use(route.path, route.route));

// router.use('/users', UserRoutes)
// router.use('/academic-semester', SemesterRoutes);

export default router;
