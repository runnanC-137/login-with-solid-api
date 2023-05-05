import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { hashProvider, tokenProvider } from '../../../service/providers/implementation'
import { userRepository } from '../../../service/repositories/implementations'
import { app } from '../../app'
import User from '../../../service/entities/User'

describe('Testando a rota de login', () => {
  it('Deve retornar um usuario com nome e email atualizados', async () => {
    const password = '123456'
    const user = new User({
      name: 'ruan',
      email: 'matue@g',
      password: hashProvider.hashPassword(password)
    })
    const userUpdate = {
      id: user.id,
      name: 'matue',
      email: 'matue@gmail.com'
    }
    await userRepository.create(user)
    const token = tokenProvider.createToken({ id: user.id })
    expect(user.name).toBe(user.name)
    expect(user.email).toBe(user.email)
    const response = await request(app)
      .put('/user')
      .set('Authorization', `Bearer ${token}`)
      .send(userUpdate)
    expect(response.status).toBe(200)
    expect(response.body.error).toBeFalsy()
    expect(response.body.name).toBe(userUpdate.name)
    expect(response.body.email).toBe(userUpdate.email)
  })
  it('Deve retornar um error de dados inválidos', async () => {
    const password = '123456'
    const user = new User({
      name: 'ruan',
      email: 'matue@g',
      password: hashProvider.hashPassword(password)
    })
    const userUpdate = {
      id: user.id,
      name: '',
      email: ''
    }
    await userRepository.create(user)
    const token = tokenProvider.createToken({ id: user.id })
    const response = await request(app)
      .put('/user')
      .set('Authorization', `Bearer ${token}`)
      .send(userUpdate)
    expect(response.status).toBe(400)
    expect(response.body.error).toBeTruthy()
    expect(response.body.error).toBeTruthy()
    expect(response.body.error.message).toBe('"email" is not allowed to be empty')
  })
  it('Deve retornar um error de usuário inexistente', async () => {
    const userUpdate = {
      id: 'user.id',
      name: 'matue',
      email: 'matue@gmail.com'
    }
    const token = tokenProvider.createToken({ id: 'user.id' })
    const response = await request(app)
      .put('/user')
      .set('Authorization', `Bearer ${token}`)
      .send(userUpdate)
    expect(response.status).toBe(400)
    expect(response.body.error).toBeTruthy()
    expect(response.body.error.message).toBe('user not exit')
  })
})
