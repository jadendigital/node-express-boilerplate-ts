import express from 'express'

import { example } from '../../controllers/example.controller'
import { validate } from '../../middleware/validate'
import { exampleValidation } from '../../validation'

export const exampleRouter = express.Router()

exampleRouter.get('', validate(exampleValidation), example)
