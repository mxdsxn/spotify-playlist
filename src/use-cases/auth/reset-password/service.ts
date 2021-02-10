import { errorHandler } from '@common'
import { resultInterface } from '@interfaces'
import { UserSchema } from '@schemas'

interface resetCodeOptionsInterface {
  email: string,
  resetCode: string,
  newPassword: string,
}

const resetPassword = async (resetCodeOptions: resetCodeOptionsInterface): Promise<resultInterface> => {
  try {
    const user = await UserSchema.findOne({ email: resetCodeOptions.email })
      .select('+passwordResetExpires passwordResetCode')

    if (!user) {
      const result: resultInterface = {
        message: 'user not found.',
        hasError: true,
        statusCode: 404,
      }
      return result
    }

    const resetCode = user.get('passwordResetCode')
    const resetCodeExpire = user.get('passwordResetExpires')

    if (resetCode !== resetCodeOptions.resetCode) {
      const result: resultInterface = {
        message: 'invalid code.',
        hasError: true,
        statusCode: 401,
      }
      return result
    }
    if (resetCodeExpire < new Date().getTime()) {
      const result: resultInterface = {
        message: 'expired code.',
        hasError: true,
        statusCode: 401,
      }
      return result
    }

    user.set({
      password: resetCodeOptions.newPassword,
      passwordResetExpires: undefined,
      passwordResetCode: undefined,
    })
    await user.save()

    const result: resultInterface = {
      message: 'password changed.',
      hasError: false,
      statusCode: 200,
    }
    return result
  } catch (error) {
    return await errorHandler(error)
  }
}

export default resetPassword
