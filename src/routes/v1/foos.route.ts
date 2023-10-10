import express from 'express'

import { foosController } from '../../controllers'
import { validate } from '../../middleware/validate'
import { foosValidation } from '../../validation'

export const foosRouter = express.Router()

foosRouter.get('', validate(foosValidation), foosController)
