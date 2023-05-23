import { UserRepository } from '../user-repository'
import { User } from 'src/entities/user-entities' 
import { PrismaService } from 'src/database/prisma.service'
import { Injectable } from '@nestjs/common'

const prisma = new PrismaService()

@Injectable()
export class PrismaUserRepository implements UserRepository {
  public user = prisma.user
  
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

  public async readAll(): Promise<User[]> {
    return (await this.user.findMany()).map((user) => {
      return new User(user)
    })
  }

  public async read(id: string): Promise<User | null> {
    const prismaUser = await this.user.findUnique({
      where: { id },
    })
    if (!prismaUser) {
      return null
    }
    const user = new User(prismaUser)
    return user
  }

  public async readByEmail(email: string): Promise<User | null> {
    const prismaUser = await this.user.findUnique({
      where: { email },
    })
    if (!prismaUser) {
      return null
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
