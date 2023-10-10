import { catchAsync } from '../util/catchAsync'
import { example } from './example.controller'
import { foos } from './foos.controller'

export const exampleController = catchAsync(example)
export const foosController = catchAsync(foos)
