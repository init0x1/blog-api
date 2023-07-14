import express, { Application } from 'express'
import { config } from 'dotenv'
import morgan from 'morgan'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import router from './routes'

config()

const app: Application = express()

// Useing BodyParser

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Secure Http Headers With By Setting Some  Verious Values And Xss Filter

app.use(helmet())

//Logging Http Requests in Dev Mode

if (process.env.NODE_ENV == 'dev') {
  app.use(morgan('dev'))
}

// Useing Routes And Api

app.use(router)

// starting Server

const PORT: string | number = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`[+] Server Listening Now at Port : ${PORT} `)
})

export default app
