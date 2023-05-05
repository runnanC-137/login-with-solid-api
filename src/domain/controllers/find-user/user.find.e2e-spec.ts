import { test, expect, describe } from 'vitest'
import request from 'supertest'
import { app } from '../../app'
import { userRepository } from '../../../service/repositories/implementations'
import { hashProvider, tokenProvider } from '../../../service/providers/implementation'
import User from '../../../service/entities/User'

describe('[e2e] testando a procura de um usuário por meio da request', async () => {
  test('[e2e] procurando um usuário', async () => {
    const userData = {
      name: 'Runa',
      email: 'runnan@hotgas.com',
      password: hashProvider.hashPassword('818283732')
    }
    const user = new User(userData)
    await userRepository.create(user)
    const token = tokenProvider.createToken({ id: user.id })
    const response = await request(app)
      .get('/user')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: user.id })

    const userInDatabase = await userRepository.findByEmail(user.email)
    const responseUser = new User(response.body, response.body.id)

    console.log(user, 'user')
    console.log(responseUser, 'responseUser', response.body)
    console.log(userInDatabase, 'userInDatabase')

    expect(response.status).toBe(200)
    expect(response.body.error).toBeFalsy()
    expect(userInDatabase).toBeTruthy()
    expect(responseUser).toBeInstanceOf(User)
  })
})
describe('testando a validação dos controllers', async () => {
  test('[e2e] tentado deletando um usuário inexistente', async () => {
    const token = tokenProvider.createToken({ id: 'user.id' })
    const response = await request(app)
      .delete('/user')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: 'user.id' })

    expect(response.status).toBe(400)
    expect(response.body.error).toBeTruthy()
    expect(response.body.error.message).toBe('user not exist')
  })
  test('[e2e] tentado deletando um usuário sem passar os dados necessários', async () => {
    const token = tokenProvider.createToken({ id: 'user.id' })
    const response = await request(app)
      .delete('/user')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.status).toBe(400)
    expect(response.body.error).toBeTruthy()
    expect(response.body.error.message).toBe('user not exist')
  })
})
