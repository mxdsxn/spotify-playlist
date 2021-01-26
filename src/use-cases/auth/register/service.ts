import {
  userInterface, resultInterface,
} from '@interfaces'
import { UserSchema } from '@schemas'
import { UserSchemaType } from '@types'

interface registerResult extends resultInterface {
  resources?: { user: UserSchemaType }
}

const registerUser = async (newUserData: userInterface): Promise<registerResult> => {

  try {
    const checkExistUser = await UserSchema.exists({ email: newUserData.email })

    if (checkExistUser) {
      const result: registerResult = {
        hasError: true,
        message: 'Email já registrado.',
      }
      return result
    }

    const newUser = await UserSchema.create(newUserData)
    newUser.set({ password: undefined })

    const result: registerResult = {
      hasError: false,
      message: 'Registrado com sucesso.',
      resources: { user: newUser },
    }
    return result

  } catch (error) {
    const result: registerResult = {
      hasError: true,
      message: 'Erro ao cadastrar novo usuário',
    }
    return result
  }
}

export default registerUser
