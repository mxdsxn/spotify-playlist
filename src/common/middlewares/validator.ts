import {
  Request, Response, NextFunction,
} from 'express'
import { validationResult } from 'express-validator'

const validatorMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const validatorResult = validationResult(req)
  if (!validatorResult.isEmpty()) {
    return res.status(400).json(validatorResult.mapped())
  }
  next()
}

export { validatorMiddleware }
