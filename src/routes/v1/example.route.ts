import express from 'express'

import { example } from '../../controllers/example.controller'
import { validate } from '../../middleware/validate'
import { exampleValidator } from '../../validation'

export const exampleRouter = express.Router()

exampleRouter.get('', validate(exampleValidator), example)
