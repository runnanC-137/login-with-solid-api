import { InMemoryUsersRepository } from './in-memory-user.repository'
import { PrismaUserRepository } from './prisma-user.repository'

export const inMemoryUsersRepository = new InMemoryUsersRepository()
export const prismaUserRepository = new PrismaUserRepository()
