import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import routes from './routes'

class App {
  public express: express.Application

  public constructor () {
    this.express = express()

    this.middlewares()
    this.database()
    this.routes()
  }

  private middlewares (): void {
    this.express.use(cors())
    this.express.use(express.json())
  }

  private database (): void {
    mongoose.connect('mongodb+srv://admin:admin@mcp-api.vffih.mongodb.net/mcp-api?retryWrites=true&w=majority')
  }

  private routes (): void {
    this.express.use(routes)
  }
}

export default new App().express
