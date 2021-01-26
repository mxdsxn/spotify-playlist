import bcrypt from 'bcryptjs'

import { tokenUtils } from '@common'
import {
  userInterface, resultInterface,
} from '@interfaces'
import { UserSchema } from '@schemas'

interface loginResult extends resultInterface {
  resources?: { token: string }
}

const { setToken } = tokenUtils

const loginUser = async (userToAuthenticate: userInterface): Promise<loginResult> => {

  try {
    const user = await UserSchema.findOne({ email: userToAuthenticate.email }).select('+password')

    if (!user) {
      const result: loginResult = {
        message: 'Usuário não encontrado.',
        hasError: true,
      }
      return result
    }

    const isValidPassword = await bcrypt.compare(userToAuthenticate.password, user.password)

    if (!isValidPassword) {
      const result: loginResult = {
        message: 'Senha inválida.',
        hasError: true,
      }
      return result
    }

    const token = await setToken(user.get('id'))

    const result: loginResult = {
      message: 'Usuário autenticado.',
      hasError: false,
      resources: { token },
    }
    return result

  } catch (error) {
    const result: loginResult = {
      message: 'Erro ao autenticar o usuário',
      hasError: true,
    }
    return result
  }
}

export default loginUser
