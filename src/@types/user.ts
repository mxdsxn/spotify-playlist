import { Document } from 'mongoose'
import { userInterface } from '@interfaces'

type UserSchemaType = userInterface & Document

export default UserSchemaType
