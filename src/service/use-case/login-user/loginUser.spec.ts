import { test, expect, describe } from 'vitest'
import { createUserUseCase } from '../create-user'
import { loginUserUseCase } from './'
import type ICreateUserRequestDTO from '../create-user/ICreateUserDTO'
// import User from '../../entities/User'

const matueData: ICreateUserRequestDTO = {
  name: 'matue',
  email: 'matue@gmail.com',
  password: '1234567'
}

describe('testando a validação de login', async () => {
  const matue = await createUserUseCase.execute(matueData)
  test('gerar um token de autenticação pro usuário', async () => {
    const token = await loginUserUseCase.execute({
      email: matue.email,
      password: matueData.password
    })
    expect(token).toBeTypeOf('string')
  })

  test('tentar logar com a senha errada', async () => {
    void expect(loginUserUseCase.execute({
      email: matue.email,
      password: '1237'
    }))
      .rejects
      .toThrow(new Error('password or email not is correctly'))
  })

  test('tentar logar com um email inexistente', async () => {
    void expect(loginUserUseCase.execute({
      email: matue.email,
      password: '123457'
    }))
      .rejects
      .toThrow(new Error('password or email not is correctly'))
  })
})
