import dotenv from 'dotenv'
import joi from 'joi'

dotenv.config()

const envVarsSchema = joi
    .object()
    .keys({
        NODE_ENV: joi.string().valid('production', 'development', 'test').required(),
        PORT: joi.number().default(3000),
        DB_DRIVER: joi.string().valid('mssql').required(),
        DB_HOST: joi.string().required(),
        DB_PORT: joi.number().default(1433),
        DB_USERNAME: joi.string().required(),
        DB_PASSWORD: joi.string().required(),
        DB_DATABASE: joi.string().required(),
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

    knex: {
        client: value.DB_DRIVER,
        connection: {
            host: value.DB_HOST,
            port: value.DB_PORT,
            user: value.DB_USERNAME,
            password: value.DB_PASSWORD,
            database: value.DB_DATABASE,
        },
        useNullAsDefault: true,
        pool: {
            min: 0,
            max: 10,
        },
    },
}

export const isDev = () => value.NODE_ENV === 'development'
export const isProd = () => value.NODE_ENV === 'production'
