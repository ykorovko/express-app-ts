import 'reflect-metadata'
import 'dotenv/config'
import './utils/customSuccess'

import cors from 'cors'
import express from 'express'
import morgan from 'morgan'

import { errorHandler } from './middlewares/errorHandler'
import routes from './routes'
import { dbCreateConnection } from './typeorm/connection'

const app = express()
const PORT = process.env.PORT || 3000

// Middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('combined'))
app.use('/', routes)
app.use(errorHandler)

async function main() {
  try {
    await dbCreateConnection()

    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}...`)
    })
  } catch (err) {
    console.error(err)
  }
}

main()
