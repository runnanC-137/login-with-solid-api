import { User } from '../../entities/User'
import { type IUserDataQueryProps, type IUserRepository } from '../IUserRepository'
import { user as SequelizeModelUser } from '../../../infra/models/user'

class PostgresUsersRepository implements IUserRepository {
  public users = SequelizeModelUser
  public async create ({ name, id, password, email }: User): Promise<void> {
    await this.users.create({ name, id, password, email })
  }

  public async findAll (): Promise<User[]> {
    const users: User[] = []
    const sequelizeUsers = await this.users.findAll()
    sequelizeUsers.forEach(user => {
      const oneUser = new User({
        name: user.name,
        email: user.email,
        createAt: String(user.createdAt),
        updateAt: String(user.updatedAt)
      }, String(user.id))
      users.push(oneUser)
    })
    console.log(sequelizeUsers)
    return users
  }

  public async findMany ({ name }: IUserDataQueryProps): Promise<User[]> {
    const manyUsers: User[] = []
    const sequelizeUsers = await this.users.findAll({ where: { name } })
    sequelizeUsers.forEach(user => {
      const oneUser = new User({
        name: user.name,
        email: user.email,
        createAt: String(user.createdAt),
        updateAt: String(user.updatedAt)
      }, String(user.id))
      manyUsers.push(oneUser)
    })
    console.log(manyUsers)
    return manyUsers
  }

  public async findOne (dataQuery: { email?: string, id?: string }): Promise<User | undefined> {
    const sequelizeUser = await this.users.findOne({ where: dataQuery })
    console.log(sequelizeUser)
    if (sequelizeUser === null) {
      return undefined
    }
    const user = new User({ email: sequelizeUser.email, name: sequelizeUser.email }, String(sequelizeUser.id))
    user.createAt = String(sequelizeUser.createdAt)
    user.updateAt = String(sequelizeUser.updatedAt)
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

  public async update ({ id, name, email }: User): Promise<User> {
    const sequelizeUser = await this.users.findByPk(id)
    console.log(sequelizeUser, '1')
    await sequelizeUser?.update({ name, email })
    console.log(sequelizeUser, '2')
    const user = new User({ email, name }, id)
    user.createAt = String(sequelizeUser?.createdAt)
    user.updateAt = String(sequelizeUser?.updatedAt)
    return user
  }

  public async delete (userId: string): Promise<void> {
    const user = await this.users.findByPk(userId)
    await user?.destroy()
  }
}
export { PostgresUsersRepository }
