import { test, expect, describe, beforeEach, afterEach } from 'vitest'
import request from 'supertest'
import { app } from '../../../app'
import { userRepository } from '../../../../service/repositories/implementations'
import { User } from '../../../../service/entities/User'

describe('[e2e] testando a procura de todos os usuário por meio da request', async (done) => {
  beforeEach(async () => {
    await userRepository.destroyAll()
  })
  afterEach(async () => {
    await userRepository.destroyAll()
  })
  test('Procurando os usuários', async () => {
    await userRepository.create(new User({
      name: 'Runa',
      email: 'rn@hotgas.com',
      password: '8182732'
    }))
    await userRepository.create(new User({
      name: 'Runa',
      email: 'run@hotgas.com',
      password: '83732'
    }))
    await userRepository.create(new User({
      name: 'Runa',
      email: 'runnan@hgas.com',
      password: '8182837'
    }))
    await userRepository.create(new User({
      name: 'Runa',
      email: 'runnan@hotgas.com',
      password: '8183732'
    }))
    const response = await request(app)
      .get('/user')

    console.log(response.body, '000000000')
    expect(response.status).toBe(200)
    expect(response.body.error).toBeFalsy()
    expect(response.body).toBeInstanceOf(Array<User>)
    expect(response.body.length).toBe(4)
  })
})
