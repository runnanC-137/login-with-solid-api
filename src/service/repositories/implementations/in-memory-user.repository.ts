import { IUserRepository } from '../iuser.repository'
import { type User } from '@/entities/user.entity'

export class InMemoryUsersRepository implements IUserRepository {
  user: any
  public users: User[] = [] /*  model.User */
  public async create(user: User): Promise<User> {
    this.users = [...this.users, user]

    return user
  }

  public async updatePassword(user: User): Promise<void> {
    const hh = new Promise(() => console.log('dd'))
    await hh
  }

  public async findAll(): Promise<User[]> {
    return this.users
  }

  public async findOne(dataQuery: {
    email?: string
    id?: string
  }): Promise<User | undefined> {
    const user = Object.entries(dataQuery).map(([key, value]) => {
      if (key === 'id') {
        return this.users.find((user) => user.id === value)
      } else if (key === 'email') {
        return this.users.find((user) => user.email === value)
      } else {
        return undefined
      }
    })[0]

    // console.log(this.users, 'repos', key, value)
    return user
  }

  public async findById(id: string): Promise<User | null> {
    const user = await this.findOne({ id })
    return user || null
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.findOne({ email })
    return user || null
  }

  public async update(user: User): Promise<User> {
    this.users[
      this.users.findIndex((userOnArray) => userOnArray.id === user.id)
    ] = user
    return user
  }

  public async delete(userId: string): Promise<void> {
    this.users.splice(
      this.users.findIndex((userOnArray) => userOnArray.id === userId),
      1,
    )
  }
}
