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
        hasError: true,
        message: 'user not found.',
        statusCode: 404,
      }
      return result
    }

    const resetCode = user.get('passwordResetCode')
    const resetCodeExpire = user.get('passwordResetExpires')

    if (resetCode !== resetCodeOptions.resetCode) {
      const result: resultInterface = {
        hasError: true,
        message: 'invalid code.',
        statusCode: 401,
      }
      return result
    }
    if (resetCodeExpire < new Date().getTime()) {
      const result: resultInterface = {
        hasError: true,
        message: 'expired code.',
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

    const result: resultInterface = { statusCode: 200 }
    return result
  } catch (error) {
    return await errorHandler(error, 'reset password error.')
  }
}

export default resetPassword
