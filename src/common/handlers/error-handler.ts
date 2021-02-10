/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { resultInterface } from '@interfaces'

const errorHandler = async (_error: any): Promise<resultInterface> => {
  const result: resultInterface = {
    hasError: true,
    message: 'service error.',
    statusCode: 500,
  }
  return result
}

export { errorHandler }
