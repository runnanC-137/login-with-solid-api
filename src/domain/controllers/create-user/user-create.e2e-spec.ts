import { test, expect, describe, beforeEach, afterEach } from 'vitest'
import request from 'supertest'
import { app } from '../../app'
import { userRepository } from '../../../service/repositories/implementations'

describe('[e2e] testando a criação de um usuário por meio da request', async () => {
  beforeEach(async () => {
    await userRepository.destroyAll()
  })
  afterEach(async () => {
    await userRepository.destroyAll()
  })
  test('[e2e] criando um usuário', async () => {
    const userData = {
      name: 'Runa',
      email: 'runnrran@hotgas.com',
      password: '818283732'
    }
    const response = await request(app)
      .post('/user')
      .send(userData)

    const userInDatabase = await userRepository.findByEmail(userData.email)

    expect(response.body).toBe('user created with success')
    expect(response.status).toBe(201)
    expect(response.body.error).toBeFalsy()
    expect(userInDatabase).toBeTruthy()
  })
})
describe('testando a validação dos controllers', async () => {
  beforeEach(async () => {
    await userRepository.destroyAll()
  })
  afterEach(async () => {
    await userRepository.destroyAll()
  })
  test('[e2e] tentando criar o usuário sem um nome', async () => {
    const userData = {
      email: 'ruanlons@gmail.com',
      password: 'ruanruanruanruan'
    }
    const response = await request(app)
      .post('/user')
      .send(userData)

    const userInDatabase = await userRepository.findByEmail(userData.email)

    expect(response.status).toBe(400)
    expect(response.body.error).toBeTruthy()
    expect(response.body.error.message).toBe('"name" is required')
    expect(userInDatabase).toBeUndefined()
  })
})
