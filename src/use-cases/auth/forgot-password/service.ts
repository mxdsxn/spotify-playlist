import crypto from 'crypto'

import {
  userInterface, resultInterface,
} from '@interfaces'
import { UserSchema } from '@schemas'

interface forgotPasswordResult extends resultInterface {
  resources?: { resetCode: string }
}

const forgotPassword = async (newUserData: userInterface): Promise<forgotPasswordResult> => {

  try {
    const checkExistUser = await UserSchema.findOne({ email: newUserData.email })

    if (!checkExistUser) {
      const result: forgotPasswordResult = {
        message: 'Usuário não encontrado.',
        hasError: true,
      }
      return result
    }

    const resetCode = crypto.randomBytes(20).toString('hex')

    const now = new Date()
    now.setHours(now.getHours() + 1)

    await UserSchema.findByIdAndUpdate(checkExistUser.get('id'), {
      passwordResetExpires: now.getTime().toString(),
      passwordResetCode: resetCode,
    })

    const result: forgotPasswordResult = {
      message: 'Codigo para reset de senha gerado com sucesso.',
      hasError: false,
      resources: { resetCode },
    }
    return result

  } catch (error) {
    const result: forgotPasswordResult = {
      message: 'Erro ao gerar codigo para reset senha do usuário',
      hasError: true,
    }
    return result
  }
}

export default forgotPassword
