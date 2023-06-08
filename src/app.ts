import cors from 'cors';
import express, { Application } from 'express';
import golobalErrorHandlar from './app/middlewares/golobalErrorHandler';
import routers from './app/routes';

const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Appliction routs

app.use('/api/v1', routers);

// app.use('/api/v1/users', UserRoutes);
// app.use('/api/v1/academic-semester', SemesterRoutes);

// testing

// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   throw new ApiError(400, 'Ore baba error')
//   //   next('ore baba error')
// })

app.use(golobalErrorHandlar);

export default app;
