import { InMemoryUsersRepository } from './InMemoryUsersRepository'
import { PrismaUsersRepository } from './PrismaUsersRepository'

export const inMemoryUsersRepository = new InMemoryUsersRepository()
const prismaUsersRepository = new PrismaUsersRepository()
export { prismaUsersRepository as userRepository }
