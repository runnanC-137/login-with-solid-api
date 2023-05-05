import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { hashProvider, tokenProvider } from '../../../service/providers/implementation'
import { userRepository } from '../../../service/repositories/implementations'
import { app } from '../../app'
import User from '../../../service/entities/User'

describe('Testando a rota de login', () => {
  it('Deve retornar um token de acesso válido para usuário autenticado', async () => {
    const password = '123456'
    const user = new User({
      name: 'ruan',
      email: 'matue@g',
      password: hashProvider.hashPassword(password)
    })
    await userRepository.create(user)
    const response = await request(app)
      .post('/login')
      .send({
        email: user.email,
        password
      })
    expect(response.status).toBe(200)
    expect(response.headers).toHaveProperty('authentication')
    const token: string = response.headers.authentication
    expect(tokenProvider.verifyToken(token).isValid).toBeTruthy()
  })
  it('Deve retornar um erro de dados incorretos', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'user.email',
        password: 'user.email'
      })
    expect(response.status).toBe(401)
    expect(response.headers.authentication).toBeFalsy()
    expect(response.body.error).toBeTruthy()
    expect(response.body.error.message).toBe('password or email not is correctly')
  })
  it('Deve retornar um erro de dados inválidos', async () => {
    const response = await request(app)
      .post('/login')
    expect(response.status).toBe(401)
    expect(response.headers.authentication).toBeFalsy()
    expect(response.body.error).toBeTruthy()
    expect(response.body.error.message).toBe('invalid Data')
  })
})
