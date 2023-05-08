import { type IUserRepository, type IUserDataQueryProps } from '../IUserRepository'
import { type User } from '../../entities/User'
import { prisma } from '../../../infra/prisma'

export class PrismaUsersRepository implements IUserRepository {
  public users = prisma.user

  public async create (user: User): Promise<void> {
    /*  const newPrismaUser =  */ await this.users.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password
      }
    })
    /* user.id = newPrismaUser.id
    user.createAt = newPrismaUser.createAt
    user.updateAt = newPrismaUser.updateAt
    return user */
  }

  public async findAll (): Promise<User[]> {
    const manyPrismaUsers = await this.users.findMany()
    return manyPrismaUsers
  }

  public async findMany ({ name }: IUserDataQueryProps): Promise<User[]> {
    const manyPrismaUsers = await this.users.findMany({ where: { name } })
    return manyPrismaUsers
  }

  public async findById (id: string): Promise<User | null> {
    const prismaUser = await prisma.user.findUnique({
      where: { id }
    })
    // console.log(prismaUser)
    return prismaUser
  }

  public async findByEmail (email: string): Promise<User | null> {
    const prismaUser = await prisma.user.findUnique({
      where: { email }
    })
    // console.log(this.users, 'repos', key, value)
    return prismaUser
  }

  public async update (user: User): Promise<User> {
    const { id, createdAt, password, email, ...rest } = user
    await prisma.user.update({
      where: { id },
      data: { email: email === '' ? undefined : email, ...rest }
    })
    return user
  }

  public async delete (id: string): Promise<void> {
    await prisma.user.delete({
      where: { id }
    })
  }
}
