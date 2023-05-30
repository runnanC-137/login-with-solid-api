import { InMemoryUsersRepository } from './in-memory-users.repository'
import { PrismaUserRepository } from './prisma-user.repository'

export const inMemoryUsersRepository = new InMemoryUsersRepository()
export const prismaUserRepository = new PrismaUserRepository()
