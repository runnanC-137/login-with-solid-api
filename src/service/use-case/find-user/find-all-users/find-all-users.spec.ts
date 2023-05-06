import { it, expect, describe } from 'vitest'
import { FindAllUserUseCase } from './find-all-users-useCase'
import { InMemoryUsersRepository } from '../../../repositories/implementations/InMemoryUsersRepository'
import { User } from '../../../entities/User'

describe('testado a procura de usuários pelos campos', async () => {
  it('Devera retornar todos os usuários com o nome Marcelo', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const findAllUserUseCase = new FindAllUserUseCase(
      inMemoryUsersRepository
    )
    const user = new User({
      name: 'Marcelo',
      email: 'marcelo1@gmail.com',
      password: 'matue23'
    })
    await inMemoryUsersRepository.create(user)
    await inMemoryUsersRepository.create(user)
    await inMemoryUsersRepository.create(user)
    await inMemoryUsersRepository.create(user)

    const usersMarceloName = await findAllUserUseCase.execute()
    expect(usersMarceloName).toBeInstanceOf(Array<User>)
    expect(usersMarceloName.length).toBe(4)
  })
  it('Devera retornar uma lista vazia', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const findAllUserUseCase = new FindAllUserUseCase(
      inMemoryUsersRepository
    )
    const usersMarceloName = await findAllUserUseCase.execute()
    expect(usersMarceloName).toBeInstanceOf(Array<User>)
    expect(usersMarceloName.length).toBe(0)
  })
})
