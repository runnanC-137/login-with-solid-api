import { InMemoryUsersRepository } from './InMemoryUsersRepository'
import { PostgresUsersRepository } from './PostgresUsersRepository'
export const inMemoryUsersRepository = new InMemoryUsersRepository()
const postgresUsersRepository = new PostgresUsersRepository()
export { postgresUsersRepository as userRepository }
