import bcrypt from 'bcryptjs'

import { setToken } from '@token'
import { userSchema, IUser } from '@schemas'

const loginUser = async (userToAuthenticate: IUser) => {

  try {
    const user = await userSchema.findOne({ email: userToAuthenticate.email }).select('+password')

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
