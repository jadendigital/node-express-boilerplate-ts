import express from 'express'

import { exampleRouter } from './example.route'
import { foosRouter } from './foos.route'

export const router = express.Router()

router.use('/example', exampleRouter)
router.use('/foos', foosRouter)
