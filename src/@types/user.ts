import { Document } from 'mongoose'
import { userInterface } from '@interfaces'

type UserType = userInterface & Document

export default UserType
