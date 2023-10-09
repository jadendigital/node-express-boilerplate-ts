import { config } from './config/config'
import { logger } from './config/logger'
import { configureHttpServer } from './configureHttpServer'
;(async function () {
    const httpServer = await configureHttpServer()

    logger.info('app configured')

    const server = httpServer.listen(config.port, () => {
        logger.info(`Listening on port ${config.port}`)
    })

    const exitHandler = () => {
        if (server) {
            server.close(() => {
                logger.info('server closed - exiting process')
                process.exit(1)
            })
        } else {
            logger.info('exiting process')
            process.exit(1)
        }
    }

    const unexpectedErrorHandler = (error: any) => {
        logger.error(error)
        exitHandler()
    }

    process.on('uncaughtException', unexpectedErrorHandler)
    process.on('unhandledRejection', unexpectedErrorHandler)

    process.on('SIGTERM', () => {
        logger.info('SIGTERM received')
        if (server) {
            server.close()
        }
    })
})().catch(logger.error)
