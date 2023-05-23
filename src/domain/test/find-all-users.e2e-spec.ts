
import request from 'supertest'
import { app } from '../../../app'
import { userRepository } from '../../../../service/repositories/implementations'
import { User } from '../../../../service/entities/User'

describe('[e2e] testando a procura de todos os usuário por meio da request', async () => {
  test('Procurando os usuários', async () => {
    const user = new User({
      name: 'Runa',
      email: 'runnan@hotgas.com',
      password: '818283732'
    })
    await userRepository.create(user)
    await userRepository.create(user)
    await userRepository.create(user)
    await userRepository.create(user)

    const response = await request(app)
      .get('/user')

    expect(response.status).toBe(200)
    expect(response.body.error).toBeFalsy()
    expect(response.body).toBeInstanceOf(Array<User>)
    expect(response.body.length).toBe(4)
  })
})
