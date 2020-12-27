import bcrypt from 'bcryptjs'

import setToken from 'src/common/token'
import User, { IUser } from "src/schemas/user"

const loginUser = async (userToAuthenticate: IUser) => {

  try {
    const user = await User.findOne({ email: userToAuthenticate.email }).select('+password')

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
    console.log({ token })

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
