import cors from 'cors'
import express, { Application } from 'express'
import { UserRoutes } from './app/modules/users/user.route'
import golobalErrorHandlar from './middlewares/golobalErrorHandler'

const app: Application = express()

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Appliction routs

app.use('/api/v1/users', UserRoutes)

// testing

// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   throw new ApiError(400, 'Ore baba error')
//   //   next('ore baba error')
// })

app.use(golobalErrorHandlar)

export default app
