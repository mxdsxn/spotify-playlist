import { resultInterface } from '@interfaces'
import { UserSchema } from '@schemas'

interface IResetPassword {
  email: string,
  resetCode: string,
  newPassword: string,
}

const resetPassword = async (newUserData: IResetPassword): Promise<resultInterface> => {

  try {
    const checkExistUser = await UserSchema.findOne({ email: newUserData.email }).select('+passwordResetExpires passwordResetCode')

    if (!checkExistUser) {
      const result: resultInterface = {
        message: 'Usuário não encontrado.',
        hasError: true,
      }
      return result
    }

    const userResetCode = checkExistUser.get('passwordResetCode')
    const userResetCodeExpire = checkExistUser.get('passwordResetExpires')

    if (userResetCode !== newUserData.resetCode) {
      const result: resultInterface = {
        message: 'Codigo inválido.',
        hasError: true,
      }
      return result
    } else if (userResetCodeExpire < new Date().getTime()) {
      const result: resultInterface = {
        message: 'Codigo expirado.',
        hasError: true,
      }
      return result
    }

    checkExistUser.set({
      password: newUserData.newPassword,
      passwordResetExpires: undefined,
      passwordResetCode: undefined,
    })

    await checkExistUser.save()

    const result: resultInterface = {
      message: 'Senha alterada com sucesso.',
      hasError: false,
    }
    return result

  } catch (error) {
    const result: resultInterface = {
      message: 'Erro ao encontrar resetar senha do usuário',
      hasError: true,
    }
    return result
  }
}

export default resetPassword
