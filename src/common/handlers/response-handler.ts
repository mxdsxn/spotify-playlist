/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response } from 'express'
import { resultInterface } from '@interfaces'

const responseHandler = async (res: Response, result: resultInterface): Promise<Response> => {
  const {
    resources, statusCode, hasError, message,
  } = result
  return res
    .status(statusCode)
    .json(!hasError
      ? resources
      : { message })
}

export { responseHandler }
