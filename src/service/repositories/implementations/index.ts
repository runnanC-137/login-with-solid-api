import { InMemoryUsersRepository } from './InMemoryUsersRepository'

const inMemoryUsersRepository = new InMemoryUsersRepository()

export { inMemoryUsersRepository as userRepository }
