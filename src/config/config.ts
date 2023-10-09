import dotenv from 'dotenv'
import joi from 'joi'

dotenv.config()

const envVarsSchema = joi
    .object()
    .keys({
        NODE_ENV: joi.string().valid('production', 'development', 'test').required(),
        PORT: joi.number().default(3000),
    })
    .unknown()

const { value, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env)

if (error) {
    throw new Error(`Config validation error: ${error.message}`)
}

export const config = {
    env: value.NODE_ENV,
    port: value.PORT,
    bodyLimit: '100kb',
}

export const isDev = () => value.NODE_ENV === 'development'
export const isProd = () => value.NODE_ENV === 'production'
