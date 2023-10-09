import winston from 'winston'

import { isDev } from './config'

const enumerateErrorFormat = winston.format((info) => {
    if (info instanceof Error) {
        Object.assign(info, { message: info.stack })
    }
    return info
})

export const logger = winston.createLogger({
    level: isDev() ? 'debug' : 'info',
    format: winston.format.combine(
        enumerateErrorFormat(),
        isDev() ? winston.format.colorize() : winston.format.uncolorize(),
        winston.format.splat(),
        winston.format.printf(({ level, message }) => `${level}: ${message}`),
    ),
    transports: [
        new winston.transports.Console({
            stderrLevels: ['error'],
        }),
    ],
})
