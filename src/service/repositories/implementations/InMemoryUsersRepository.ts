import type UserRepository from '../IUserRepository'
import type User from '../../entities/User'

interface IUserDataQueryProps {
  email?: string
  id?: string
}

class InMemoryUsersRepository implements UserRepository {
  public users: User[] = [] /*  model.User */
  public async create (user: User): Promise<void> {
    this.users = [...this.users, user]
    // console.log(this.users)
  }

  public findAll (): User[] {
    return this.users
  }

  public async findOne (dataQuery: IUserDataQueryProps): Promise<User | undefined> {
    const user = Object.entries(dataQuery).map(([key, value]) => {
      if (key === 'id') {
        return this.users.find(user => user.id === value)
      } else if (key === 'email') {
        return this.users.find(user => user.email === value)
      } else {
        return undefined
      }
    })[0]

    // console.log(this.users, 'repos', key, value)
    return user
  }

  public async findById (id: string): Promise<User | undefined> {
    const user = this.findOne({ id })
    return await user
  }

  public async findByEmail (email: string): Promise<User | undefined> {
    const user = await this.findOne({ email })
    return user
  }

  public async update (user: User): Promise<User> {
    this.users[
      this.users.findIndex((userOnArray) => userOnArray.id === user.id)
    ] = user
    return user
  }

  public async delete (userId: string): Promise<void> {
    this.users.splice(
      this.users.findIndex((userOnArray) => userOnArray.id === userId)
      , 1)
  }
}

export default InMemoryUsersRepository
