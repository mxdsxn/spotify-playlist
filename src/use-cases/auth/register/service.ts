import { errorHandler } from '@common'
import {
  userInterface, resultInterface,
} from '@interfaces'
import { UserSchema } from '@schemas'

const registerUser = async (userData: userInterface): Promise<resultInterface> => {
  try {
    const user = await UserSchema.exists({ email: userData.email })

    if (user) {
      const result: resultInterface = {
        hasError: true,
        message: 'invalid email.',
        statusCode: 409,
      }
      return result
    }

    const newUser = await UserSchema.create(userData)
    newUser.set({ password: undefined })

    const result: resultInterface = {
      hasError: false,
      message: 'registered user.',
      resources: { user: newUser },
      statusCode: 201,
    }
    return result
  } catch (error) {
    return await errorHandler(error)
  }
}

export default registerUser
