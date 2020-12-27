import crypto from 'crypto'

import User, { IUser } from "src/schemas/user"

const forgotPassword = async (newUserData: IUser) => {

  try {
    const checkExistUser = await User.findOne({ email: newUserData.email })

    if (!checkExistUser) {
      const result = {
        message: 'Email não registrado.',
        resources: null,
      }
      return result
    }

    const codeForgot = crypto.randomBytes(20).toString('hex')

    const now = new Date()
    now.setHours(now.getHours() + 1)

    await User.findByIdAndUpdate(checkExistUser.get('id'), checkExistUser.set({
      passwordResetExpires: now.getTime(),
      passwordResetToken: codeForgot,
    }))

    const result = {
      message: 'Codigo para reset de senha gerado com sucesso.',
      resources: { user: codeForgot }
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

export default forgotPassword
