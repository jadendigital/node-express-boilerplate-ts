import compression from 'compression'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { createServer } from 'http'
import httpStatus from 'http-status'
import xss from 'xss-clean'

import { config } from './config/config'
import * as morgan from './config/morgan'
import { errorConverter, errorHandler } from './middleware/error'
import { router } from './routes/v1'
import { ApiError } from './util/ApiError'

const app = express()

export type GetHandlerType = Parameters<typeof app.use>[1]
export type GetRequestType = Parameters<GetHandlerType>[0]
export type GetResponseType = Parameters<GetHandlerType>[1]
export type GetNextType = Parameters<GetHandlerType>[2]

export async function configureHttpServer() {
    const httpServer = createServer(app)

    if (config.env !== 'test') {
        app.use(morgan.successHandler)
        app.use(morgan.errorHandler)
    }

    // set security HTTP headers
    app.use(helmet())

    // parse json request body
    app.use(
        express.json({
            limit: config.bodyLimit,
        }),
    )

    // parse urlencoded request body
    app.use(express.urlencoded({ extended: true }))

    // sanitize request data
    app.use(xss())

    // gzip compression
    app.use(compression())

    // enable cors
    app.use(cors())
    app.options('*', cors())

    // limit repeated failed requests to some endpoints
    if (config.env === 'production') {
        // e.g. app.use('/v1/auth', authLimiter)
    }

    // v1 api routes
    app.use('/v1', router)

    // for health checks
    app.get('/favicon.ico', (_, res) => void res.sendStatus(httpStatus.NO_CONTENT))
    app.get('', (_, res) => void res.sendStatus(httpStatus.OK))

    // send back a 404 error for any unknown api request
    app.use((req, res, next) => {
        next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
    })

    // convert error to ApiError, if needed
    app.use(errorConverter)

    // handle error
    app.use(errorHandler)

    // return the real IP address even if behind proxy
    app.set('trust proxy', true)

    return httpServer
}
