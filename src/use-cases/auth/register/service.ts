import {
  UserSchema, userInterface,
} from '@schemas'

const registerUser = async (newUserData: userInterface) => {

  try {
    const checkExistUser = await UserSchema.exists({ email: newUserData.email })

    if (checkExistUser) {
      const result = {
        message: 'Email já registrado.',
        resources: null,
      }
      return result
    }

    const newUser = await UserSchema.create(newUserData)
    newUser.set({ password: undefined })

    const result = {
      message: 'Registrado com sucesso.',
      resources: { user: newUser },
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
