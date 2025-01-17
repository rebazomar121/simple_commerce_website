import express, { Application, Express } from "express"
import cors from "cors"
import bodyParser from "body-parser"
import "colors"
require("dotenv").config()
import router from "../api/api.routes"
import { CONFIG_CONST } from "./config.const"
import connectMongoDb from "../database/mongodb/connectMongoDb"
import swaggerUi from "swagger-ui-express"
import swaggerJsDoc from "swagger-jsdoc"

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Swinger API Testing",
      version: "1.0.0",
      description: "A simple Express Library API",
    },
    servers: [
      {
        url: "http://localhost:1487",
      },
    ],
  },
  apis: ["src/api/**/*.ts"],
}

/**
 * Configure Swagger and start the Express application.
 */
export const app: Express = express()

const config = () => {
  connectMongoDb()
  app.use(
    bodyParser.json({
      verify: (req: any, res: any, buf: any, encoding: any) => {
        if (buf && buf.length) {
          req.rawBody = buf.toString(encoding || "utf8")
        }
      },
    }),
  )
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cors())

  // Swagger setup
  const swaggerSpec = swaggerJsDoc(options)
  const setupSwagger = (app: Express) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  }

  setupSwagger(app)
  app.use("/api", router)
  app.listen(CONFIG_CONST.CONFIG_CONST_PORT, () => {
    return console.log(
      `${CONFIG_CONST.CONFIG_CONST_LISTEN_MESSAGE +
        CONFIG_CONST.CONFIG_CONST_PORT
        }`.blue,
    )
  })
}
export default config
