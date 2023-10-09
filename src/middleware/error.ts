import httpStatus from 'http-status'

import { isDev } from '../config/config'
import { logger } from '../config/logger'
import type { GetNextType, GetRequestType, GetResponseType } from '../configureHttpServer'
import { ApiError } from '../util/ApiError'

export const errorConverter = (
    err: any,
    _: GetRequestType,
    __: GetResponseType,
    next: GetNextType,
) => {
    let error = err
    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR
        const message = error.message || httpStatus[httpStatus.INTERNAL_SERVER_ERROR]
        error = new ApiError(statusCode, message, false, err.stack)
    }
    next(error)
}

export const errorHandler = (err: any, _: GetRequestType, res: GetResponseType) => {
    let { statusCode, message } = err
    if (!isDev() && !err.isOperational) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR
        message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR]
    }

    res.locals.errorMessage = err.message

    const response = {
        code: statusCode,
        message,
        ...(isDev() && { stack: err.stack }),
    }

    if (isDev()) {
        logger.error(err)
    }

    res.status(statusCode).send(response)
}
