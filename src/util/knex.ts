import knexjs from 'knex'

import { config } from '../config/config'

export const knex = knexjs(config.knex)
