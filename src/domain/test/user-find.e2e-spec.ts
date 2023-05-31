
import request from 'supertest'
import { app } from '../app.domain'
import { userRepository } from '../../service/repositories/implementations'
import { User } from '../../service/entities/user.entity'

describe('[e2e] testando a procura de um usuário por meio da request', async () => {
  test('Procurando um usuário', async () => {
    const user = new User({
      name: 'Runa',
      email: 'runnan@hotgas.com',
      password: '818283732'
    })
    await userRepository.create(user)
    const response = await request(app)
      .get(`/user/${user.id}`)

    expect(response.status).toBe(200)
    expect(response.body.error).toBeFalsy()
    expect(await userRepository.findByEmail(user.email)).toBeInstanceOf(User)
    expect(new User(response.body, response.body.id)).toBeInstanceOf(User)
  })
})
describe('testando a validação dos controllers', async () => {
  test('[e2e] tentado deletando um usuário inexistente', async () => {
    const response = await request(app)
      .delete(`/user/${'user.id'}`)

    expect(response.status).toBe(400)
    expect(response.body.error).toBeTruthy()
    expect(response.body.error.message).toBe('user not exist')
  })
  test('[e2e] tentado deletando um usuário sem passar os dados necessários', async () => {
    const response = await request(app)
      .delete(`/user/${'user.id'}`)

    expect(response.status).toBe(400)
    expect(response.body.error).toBeTruthy()
    expect(response.body.error.message).toBe('user not exist')
  })
})
