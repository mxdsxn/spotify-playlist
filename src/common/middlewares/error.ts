/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  NextFunction,
  Request, Response,
} from 'express'

const errorMiddleware = async (err: any, req: Request, res: Response, _next: NextFunction): Promise<Response | void> => {
  return res.status(500).json({
    message: `error in ${req.originalUrl}`,
    error: err.toString(),
  })
}

export { errorMiddleware }
