import config from '../../../config'
import { IUser } from './users.interface'
import { User } from './users.model'
import { generateUserId } from './users.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto generated incremantal id
  const id = await generateUserId()
  user.id = id
  // default password
  if (!user.Password) {
    user.Password = config.default_user_password as string
  }
  const createdUsers = await User.create(user)
  if (!createUser) {
    throw new Error('Failed to create User')
  }
  return createdUsers
}

export default {
  createUser,
}
