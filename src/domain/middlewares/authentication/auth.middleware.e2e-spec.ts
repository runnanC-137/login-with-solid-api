import { test, expect, describe } from 'vitest'
import request from 'supertest'
import { app } from '../../app'
import { userRepository } from '../../../service/repositories/implementations'
import { hashProvider, tokenProvider } from '../../../service/providers/implementation'
import User from '../../../service/entities/User'

describe('[e2e] testando a autenticação de um usuário por meio da request', async () => {
  test('[e2e] tentando acessar a rota de procura com um usuário autenticado', async () => {
    const userData = {
      name: 'Runa',
      email: 'runnan@hotgas.com',
      password: hashProvider.hashPassword('818283732')
    }
    const user = new User(userData)
    const token = tokenProvider.createToken({ id: user.id })
    // const { isValid } = tokenProvider.verifyToken(token)
    await userRepository.create(user)
    const response = await request(app)
      .get('/user')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: user.id })

    console.log(token, 'createToken')

    expect(new User(response.body)).toBeInstanceOf(User)
    expect(response.status).toBe(200)
    expect(response.body.error).toBeFalsy()
  })
  test('[e2e] tentando acessar uma rota sem um token de acesso', async () => {
    const userData = {
      name: 'Runa',
      email: 'runnan@hotgas.com',
      password: hashProvider.hashPassword('818283732')
    }
    const user = new User(userData)
    await userRepository.create(user)
    const response = await request(app)
      .get('/user')
      .send({ id: user.id })

    expect(response.status).toBe(401)
    expect(response.body.error).toBeTruthy()
    expect(response.body.error.message).toBe('token is not defined')
  })
})
