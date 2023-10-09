import type { GetNextType, GetRequestType, GetResponseType } from '../configureHttpServer'

type Handler<TRequest extends GetRequestType> = (
    req: TRequest,
    res: GetResponseType,
    next: GetNextType,
) => Promise<any>

export const catchAsync =
    <TRequest extends GetRequestType>(fn: Handler<TRequest>) =>
    (req: TRequest, res: GetResponseType, next: GetNextType) => {
        Promise.resolve(fn(req, res, next)).catch(next)
    }
