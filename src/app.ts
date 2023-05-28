import cors from 'cors'
import express, { Application, Request, Response } from 'express'
const app: Application = express()

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// testing
app.get('/', (req: Request, res: Response) => {
  res.send('University Management server ')
})

export default app
