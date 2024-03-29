import { resultInterface } from "@interfaces"
import { envs } from '@config'

const { NODE_ENV } = envs

const errorHandler = async (error: any, message?: string): Promise<resultInterface> => {
  NODE_ENV === 'test' && global.console.log(error)

  const result: resultInterface = {
    hasError: true,
    message: message || 'service error.',
    statusCode: 500,
  }
  return result
}

export { errorHandler }
