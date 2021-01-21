import bcrypt from 'bcryptjs'

import { tokenUtils } from '@common'
import { userInterface } from '@interfaces'
import { UserSchema } from '@schemas'

const { setToken } = tokenUtils

const loginUser = async (userToAuthenticate: userInterface) => {

  try {
    const user = await UserSchema.findOne({ email: userToAuthenticate.email }).select('+password')

    if (!user) {
      const result = {
        message: 'Usuário não encontrado.',
        resources: null,
      }
      return result
    }

    const isValidPassword = await bcrypt.compare(userToAuthenticate.password, user.password)

    if (!isValidPassword) {
      const result = {
        message: 'Senha inválida.',
        resources: null,
      }
      return result
    }

    const token = await setToken(user.get('id'))

    const result = {
      message: 'Usuário autenticado.',
      resources: { token },
    }
    return result

  } catch (error) {
    const result = {
      message: 'Erro ao autenticar o usuário',
      resources: null,
    }
    return result
  }
}

export default loginUser
