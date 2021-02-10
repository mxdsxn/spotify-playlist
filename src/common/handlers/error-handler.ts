import { resultInterface } from '@interfaces'

const errorHandler = async (error: any): Promise<resultInterface> => {
  const result: resultInterface = {
    hasError: true,
    message: 'internal error.',
  }
  return result
}

export { errorHandler }
