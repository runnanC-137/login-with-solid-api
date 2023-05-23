import { IUserRepository } from '../IUserRepository'
import { User } from '../../entities/User'
import { prisma } from '../../../infra/prisma'

export class PrismaUserRepository implements IUserRepository {
  public user = prisma.user /*  model.User */
  public async create(user: User): Promise<User> {
    const prismaUser = await this.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    })
    const savedUser = new User(prismaUser)
    return savedUser
  }

  public async findAll(): Promise<User[]> {
    return (await this.user.findMany()).map((user) => {
      return new User(user)
    })
  }

  public async findById(id: string): Promise<User | null> {
    const prismaUser = await this.user.findUnique({
      where: { id },
    })
    if (!prismaUser) {
      return prismaUser
    }
    const user = new User(prismaUser)
    return user
  }

  public async findByEmail(email: string): Promise<User | null> {
    const prismaUser = await this.user.findUnique({
      where: { email },
    })
    if (!prismaUser) {
      return prismaUser
    }
    const user = new User(prismaUser)
    return user
  }

  public async update(user: User): Promise<User> {
    const prismaUser = await this.user.findFirstOrThrow({
      where: { id: user.id },
    })
    const email = prismaUser.email === user.email ? undefined : user.email
    const updatedUserPrisma = await this.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        email,
      },
    })
    const updatedUser = new User(updatedUserPrisma)
    return updatedUser
  }

  /*  public async updateEmail (user: User): Promise<User> {

  } */
  public async updatePassword(user: User): Promise<void> {
    await this.user.update({
      where: { id: user.id },
      data: {
        password: user.password,
      },
    })
  }

  public async delete(id: string): Promise<void> {
    await this.user.delete({
      where: { id },
    })
  }
}
