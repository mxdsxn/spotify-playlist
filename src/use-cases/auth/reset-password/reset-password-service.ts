import crypto from 'crypto'

import User, { IUser } from "src/schemas/user"

interface resetPasswordInterface {
  email: string,
  resetCode: string,
  newPassword: string,
}
const resetPassword = async (newUserData: resetPasswordInterface) => {

  try {
    const checkExistUser = await User.findOne({ email: newUserData.email }).select('+password passwordResetExpires passwordResetCode')

    if (!checkExistUser) {
      const result = {
        message: 'Usuário não encontrado.',
        resources: null,
      }
      return result
    }

    const userResetCode = checkExistUser.get('passwordResetCode')
    const userResetCodeExpire = checkExistUser.get('passwordResetExpires')

    if (userResetCode !== newUserData.resetCode) {
      const result = {
        message: 'Codigo inválido.',
        resources: null,
      }
      return result
    } else if (userResetCodeExpire < new Date().getTime()) {
      const result = {
        message: 'Codigo expirado.',
        resources: null,
      }
      return result
    }

    checkExistUser.set({
      password: newUserData.newPassword,
      passwordResetExpires: undefined,
      passwordResetCode: undefined,
    })

    await checkExistUser.save()

    const result = {
      message: 'Senha alterada com sucesso.',
      resources: { resetPassword: 'Ok', checkExistUser }
    }
    return result

  } catch (error) {
    const result = {
      message: 'Erro ao encontrar resetar senha do usuário',
      resources: null,
    }
    return result
  }
}

export default resetPassword
