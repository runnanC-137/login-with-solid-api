import { test, expect, describe } from 'vitest'
import { createUserUseCase } from '../../create-user'
import { type ICreateUserRequestDTO } from '../../create-user/icreate-user-DTO'
import { findUserUseCase } from '.'
import { User } from '../../../entities/User'

const matueData: ICreateUserRequestDTO = {
  name: 'matue',
  email: 'matue@gmail.com',
  password: '1234567'
}

describe('testado a procura de um usuário(s)', async () => {
  const matue = await createUserUseCase.execute(matueData)
  const matueId = matue.id

  test('testando a criação de um usuário', async () => {
    expect(matue).toBeInstanceOf(User)
    expect(matue.id).toBe(matueId)
    expect(matue.name).toBe(matueData.name)
    expect(matue.email).toBe(matueData.email)
  })

  test('procurando o usuário matue', async () => {
    const matue = await findUserUseCase.execute({
      id: matueId
    })
    expect(matue.id).toBe(matueId)
    expect(matue).toBeInstanceOf(User)
    expect(matue.name).toBe(matueData.name)
  })

  test('excluindo um usuário inexistente', async () => {
    try {
      await findUserUseCase.execute({ id: 'matueData.id' })
    } catch (error: any) {
      expect(error.message).toBe('user not exist')
    }
  })
})
