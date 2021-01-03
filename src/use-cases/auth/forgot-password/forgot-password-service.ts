import crypto from 'crypto'

import { userSchema } from '@schemas'
import { IUser } from '@interfaces'

const forgotPassword = async (newUserData: IUser) => {

  try {
    const checkExistUser = await userSchema.findOne({ email: newUserData.email })

    if (!checkExistUser) {
      const result = {
        message: 'Usuário não encontrado.',
        resources: null,
      }
      return result
    }

    const resetCode = crypto.randomBytes(20).toString('hex')

    const now = new Date()
    now.setHours(now.getHours() + 1)

    await userSchema.findByIdAndUpdate(checkExistUser.get('id'), {
      passwordResetExpires: now.getTime().toString(),
      passwordResetCode: resetCode,
    })

    const result = {
      message: 'Codigo para reset de senha gerado com sucesso.',
      resources: { resetCode },
    }
    return result

  } catch (error) {
    const result = {
      message: 'Erro ao gerar codigo para reset senha do usuário',
      resources: null,
    }
    return result
  }
}

export default forgotPassword
