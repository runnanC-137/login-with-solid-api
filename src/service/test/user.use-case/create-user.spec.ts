import { test, expect } from 'vitest'
import { createUserUseCase } from '../create-user'
import { User } from '../../entities/user.entity'

test('criar um usuario', async () => {
  const name = 'matue'
  const email = 'matue@gmail.com'
  const password = '1234567'
  const matue = await createUserUseCase.execute({
    name,
    email,
    password
  })
  expect(matue).toBeInstanceOf(User)
  expect(matue.name).toBe(name)
})
test('tentar criar outro usuário so que com o mesmo email', async () => {
  const name = 'teto'
  const email = 'matue@gmail.com'
  const password = '123456789'
  try {
    await createUserUseCase.execute({
      name,
      email,
      password
    })
  } catch (error: any) {
    expect(error).toBeInstanceOf(Error)
    expect(error.message).toBe('user already exit')
  }
})
