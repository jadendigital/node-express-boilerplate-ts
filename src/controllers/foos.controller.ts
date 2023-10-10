import { Request, Response } from 'express'
import httpStatus from 'http-status'

import { getFooNames } from '../services/foos'

export const foos = async (req: Request, res: Response) => {
    const foos = await getFooNames()
    res.status(httpStatus.OK).send(foos)
}
