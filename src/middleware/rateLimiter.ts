import rateLimit from 'express-rate-limit'

export const exampleRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    skipSuccessfulRequests: true,
})
