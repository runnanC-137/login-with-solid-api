import { it, expect, describe } from 'vitest'
import { FindUsersByFieldUseCase } from './find-users-byField-useCase'
import { InMemoryUsersRepository } from '../../../repositories/implementations/InMemoryUsersRepository'
import { User } from '../../../entities/User'

describe('testado a procura de usuários pelos campos', async () => {
  it('Devera retornar todos os usuários com o nome Marcelo', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const findUsersByFieldUseCase = new FindUsersByFieldUseCase(
      inMemoryUsersRepository
    )
    const user = new User({
      name: 'Marcelo',
      email: 'marcelo1@gmail.com',
      password: 'matue23'
    })
    const user2 = new User({
      name: 'Marcus',
      email: 'marcelo1@gmail.com',
      password: 'matue23'
    })
    await inMemoryUsersRepository.create(user)
    await inMemoryUsersRepository.create(user)
    await inMemoryUsersRepository.create(user)
    await inMemoryUsersRepository.create(user2)
    await inMemoryUsersRepository.create(user2)

    const usersMarceloName = await findUsersByFieldUseCase.execute({
      name: 'Marcelo'
    })
    expect(usersMarceloName).toBeInstanceOf(Array<User>)
    expect(usersMarceloName.length).toBe(3)
  })
  it('Devera retornar uma lista vazia', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const findUsersByFieldUseCase = new FindUsersByFieldUseCase(
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

    const usersMarceloName = await findUsersByFieldUseCase.execute({
      name: 'Marcus'
    })
    expect(usersMarceloName).toBeInstanceOf(Array<User>)
    expect(usersMarceloName.length).toBe(0)
  })
})
