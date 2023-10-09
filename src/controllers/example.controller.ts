import { Request, Response } from 'express'
import httpStatus from 'http-status'

export const example = async (req: Request, res: Response) => {
    res.status(httpStatus.OK).send({ message: 'Hello World!' })
}
