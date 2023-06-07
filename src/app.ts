import cors from 'cors';
import express, { Application } from 'express';
import golobalErrorHandlar from './app/middlewares/golobalErrorHandler';
import { SemesterRoutes } from './app/modules/academicSemester/academicSemester.route';
import { UserRoutes } from './app/modules/user/user.route';

const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Appliction routs

app.use('/api/v1/users', UserRoutes);
app.use('/api/v1/academic-semester', SemesterRoutes);

// testing

// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   throw new ApiError(400, 'Ore baba error')
//   //   next('ore baba error')
// })

app.use(golobalErrorHandlar);

export default app;
