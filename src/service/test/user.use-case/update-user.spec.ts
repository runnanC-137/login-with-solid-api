
import { updateUserUseCase } from '../update-user'
import { userRepository } from '../../repositories/implementations'
import { User } from '../../entities/user.entitie'

describe('testando a atualização de usuário', async () => {
  test('atualizando um usuário', async () => {
    const userData = {
      name: 'matue',
      email: 'matue@gmail.com',
      password: '1234567'
    }
    const user = new User(userData)
    await userRepository.create(user)

    const userDataUpdate = {
      name: 'Matue',
      email: 'matue.do.raxa@gmail.com',
      id: user.id
    }
    const userUpdate = await updateUserUseCase.execute(
      userDataUpdate
    )

    expect(userUpdate).toBeInstanceOf(User)
    expect(userUpdate.name).toBe(userDataUpdate.name)
    expect(userUpdate.email).toBe(userDataUpdate.email)
  })

  test('tentado atualizar o email de um usuário com um email já em uso', async () => {
    const user1Data = {
      name: 'matue',
      email: 'matue@gmail.com',
      password: '1234567'
    }
    const user2Data = {
      name: 'teto',
      email: 'teto@gmail.com',
      password: '1234567'
    }

    const user1 = new User(user1Data)
    const user2 = new User(user2Data)

    const user2DataUpdate = {
      name: 'TeTo',
      email: user1.email,
      id: user2.id
    }
    await userRepository.create(user1)
    await userRepository.create(user2)
    void expect(updateUserUseCase.execute(user2DataUpdate))
      .rejects
      .toThrow(new Error('user email is already in use'))
  })

  test('tentando atualizar um usuário inexistente', async () => {
    const inexistendUserDataUpdate = {
      name: 'TeTo',
      email: 'user1.email',
      id: 'user2.id'
    }
    void expect(updateUserUseCase.execute(inexistendUserDataUpdate))
      .rejects
      .toThrow(new Error('user not exit'))
  })
})
