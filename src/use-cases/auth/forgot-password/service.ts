import crypto from 'crypto'
import { errorHandler } from '@common'
import {
  userInterface, resultInterface,
} from '@interfaces'
import { UserSchema } from '@schemas'

const forgotPassword = async (newUserData: userInterface): Promise<resultInterface> => {
  try {
    const user = await UserSchema.findOne({ email: newUserData.email })

    if (!user) {
      const result: resultInterface = {
        message: 'user not found.',
        hasError: true,
        statusCode: 404,
      }
      return result
    }

    const resetCode = crypto.randomBytes(20).toString('hex')
    const now = new Date()
    now.setHours(now.getHours() + 1)

    await UserSchema.findByIdAndUpdate(user.get('id'), {
      passwordResetCode: resetCode,
      passwordResetExpires: now.getTime().toString(),
    })

    const result: resultInterface = {
      resources: { resetCode },
      statusCode: 200,
    }
    return result
  } catch (error) {
    return await errorHandler(error, 'forgot password error.')
  }
}

export default forgotPassword
