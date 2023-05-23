
import request from 'supertest'
import { app } from '../../../app'
import { userRepository } from '../../../../service/repositories/implementations'
import { User } from '../../../../service/entities/User'

describe('[e2e] testando a procura de usuários por meio da request', async () => {
  test('Procurando os usuário com nome Marcelo', async () => {
    const userData = new User({
      name: 'Marcelo',
      email: 'runnan@hotgas.com',
      password: '818283732'
    })
    const userData2 = new User({
      name: 'Ruan',
      email: 'runnan@hotgas.com',
      password: '818283732'
    })
    await userRepository.create(userData)
    await userRepository.create(userData)
    await userRepository.create(userData)
    await userRepository.create(userData2)
    await userRepository.create(userData2)

    const response = await request(app)
      .get('/user/query')
      .send({ query: { name: userData.name } })

    expect(response.status).toBe(200)
    expect(response.body.error).toBeFalsy()
    expect(response.body).toBeInstanceOf(Array<User>)
    expect(response.body.length).toBe(3)
  })
})
