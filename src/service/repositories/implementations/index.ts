import { InMemoryUsersRepository } from './InMemoryUsersRepository'
import { PrismaUserRepository } from './PrismaUserRepository'

export const inMemoryUsersRepository = new InMemoryUsersRepository()
export const prismaUserRepository = new PrismaUserRepository()
