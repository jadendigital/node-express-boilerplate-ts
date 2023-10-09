import express from 'express'

import { exampleRouter } from './example.route'

export const router = express.Router()

router.use('/example', exampleRouter)
