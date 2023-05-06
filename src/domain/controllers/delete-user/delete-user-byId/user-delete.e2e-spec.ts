import { test, expect, describe } from 'vitest'
import request from 'supertest'
import { app } from '../../../app'
import { userRepository } from '../../../../service/repositories/implementations'
import { hashProvider } from '../../../../service/providers/implementation'
import User from '../../../../service/entities/User'

describe('[e2e] testando a destruição de um usuário por meio da request', async () => {
  test('[e2e] deletando um usuário', async () => {
    const userData = {
      name: 'Runa',
      email: 'runnan@hotgas.com',
      password: hashProvider.hashPassword('818283732')
    }
    const user = new User(userData)
    await userRepository.create(user)
    const response = await request(app)
      .delete('/user')
      .send({ id: user.id })

    const userInDatabase = await userRepository.findByEmail(user.email)
    expect(response.status).toBe(204)
    expect(response.body.error).toBeFalsy()
    expect(userInDatabase).toBeUndefined()
  })
})
describe('testando a validação dos controllers', async () => {
  test('[e2e] tentado deletando um usuário inexistente', async () => {
    const response = await request(app)
      .delete('/user')
      .send({ id: 'user.id' })

    expect(response.status).toBe(400)
    expect(response.body.error).toBeTruthy()
    expect(response.body.error.message).toBe('user not exist')
  })
  test('[e2e] tentado deletando um usuário sem passar os dados necessários', async () => {
    const response = await request(app)
      .delete('/user')
      .send()

    expect(response.status).toBe(400)
    expect(response.body.error).toBeTruthy()
    expect(response.body.error.message).toBe('user not exist')
  })
})
