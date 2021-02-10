/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Request, Response,
} from 'express'

const errorMiddleware = async (err: any, req: Request, res: Response): Promise<Response | void> => {
  return res
    .status(400)
    .json({
      message: `error in ${req.originalUrl}`,
      error: err.toString(),
    })
}

export { errorMiddleware }
