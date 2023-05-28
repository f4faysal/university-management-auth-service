import { IUser } from './users.interface'
import { User } from './users.model'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto generated incremantal id
  // default password
  const createdUsers = await User.create(user)
  if (!createUser) {
    throw new Error('Failed to create User')
  }
  return createdUsers
}

export default {
  createUser,
}
