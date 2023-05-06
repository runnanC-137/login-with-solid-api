import { test, expect, describe } from 'vitest'
import { createUserUseCase } from '../create-user'
import { deleteUserUseCase } from '.'
import { findUserUseCase } from '../find-user/find-user-byId'
import { type ICreateUserRequestDTO } from '../create-user/icreate-user-DTO'
import { User } from '../../entities/User'

const matueData: ICreateUserRequestDTO = {
  name: 'matue',
  email: 'matue@gmail.com',
  password: '1234567'
}

describe('testando a destruição de um usuário', async () => {
  const matue = await createUserUseCase.execute(matueData)
  const matueId = matue.id

  test('testando a criação de um usuário', async () => {
    expect(matue).toBeInstanceOf(User)
    expect(matue.id).toBe(matueId)
    expect(matue.name).toBe(matueData.name)
    expect(matue.email).toBe(matueData.email)
  })

  test('excluindo o usuário matue', async () => {
    await deleteUserUseCase.execute({ id: matueId })
    try {
      const matueUser = await findUserUseCase.execute({ id: matueId })
      expect(matueUser).toBeTypeOf('undefined')
    } catch (error: any) {
      expect(error.message).toBe('user not exist')
    }
  })

  test('excluindo um usuário inexistente', async () => {
    try {
      await deleteUserUseCase.execute({ id: 'matueData.id' })
    } catch (error: any) {
      expect(error.message).toBe('user not exist')
    }
  })
})
