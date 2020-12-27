import {
  userSchema, 
} from '@schemas'
import {
  IUser, 
} from '@interfaces'

const registerUser = async (newUserData: IUser,) => {

  try {
    const checkExistUser = await userSchema.exists({
      email: newUserData.email, 
    },)

    if (checkExistUser) {
      const result = {
        message: 'Email já registrado.',
        resources: null,
      }
      return result
    }

    const newUser = await userSchema.create(newUserData,)
    newUser.set({
      password: undefined, 
    },)

    const result = {
      message: 'Registrado com sucesso.',
      resources: {
        user: newUser, 
      },
    }
    return result

  } catch (error) {
    const result = {
      message: 'Erro ao cadastrar novo usuário',
      resources: null,
    }
    return result
  }
}

export default registerUser
