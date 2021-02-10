import bcrypt from 'bcryptjs'
import {
  errorHandler, setToken,
} from '@common'
import {
  userInterface, resultInterface,
} from '@interfaces'
import { UserSchema } from '@schemas'

const loginUser = async (userData: userInterface): Promise<resultInterface> => {
  try {
    const user = await UserSchema.findOne({ email: userData.email }).select('+password')

    if (!user) {
      const result: resultInterface = {
        message: 'user not found.',
        hasError: true,
        statusCode: 404,
      }
      return result
    }

    const isValidPassword = await bcrypt.compare(userData.password, user.password)
    if (!isValidPassword) {
      const result: resultInterface = {
        message: 'invalid password.',
        hasError: true,
        statusCode: 401,
      }
      return result
    }

    const token = await setToken(user.get('id'))

    const result: resultInterface = {
      message: 'authenticated user.',
      hasError: false,
      resources: { token },
      statusCode: 200,
    }
    return result
  } catch (error) {
    return await errorHandler(error)
  }
}

export default loginUser
