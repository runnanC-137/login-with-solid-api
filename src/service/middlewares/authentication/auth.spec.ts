import { test, expect, describe } from 'vitest'
import { authenticationUseCase } from './index'
import { tokenProvider } from '../../providers/implementation'

describe('testando a geração de um token de autenticação pro usuário', async () => {
  test('testando se o middleware consegue verificar a validade de um token', async () => {
    const token = tokenProvider.createToken({ id: '679' })
    void expect(authenticationUseCase.execute({ token }))
      .resolves
      .not
      .toThrow()
  })
  test('testando se o middleware consegue verificar a validade de um token falso', async () => {
    void expect(authenticationUseCase.execute({ token: 'meguatanucho' }))
      .rejects
      .toThrow(new Error('token is not valid'))
  })
})
