import { catchAsync } from '../util/catchAsync'
import { example } from './example.controller'

export const exampleController = catchAsync(example)
