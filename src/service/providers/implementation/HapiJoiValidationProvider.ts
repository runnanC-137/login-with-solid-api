import Joi from '@hapi/joi'
import type ICreateUserRequestDTO from '../../use-case/create-user/ICreateUserDTO'
import type IUpdateUserRequestDTO from '../../use-case/update-user/IUpdateUserDTO'
import type IValidationProvider from '../IValidationProvider'

class HapiJoiValidationProvider implements IValidationProvider {
  public validDataForCreateUser (data: ICreateUserRequestDTO): void {
    const {
      error
    } = Joi.object({
      password: Joi.string().required().min(6).max(400),
      email: Joi.string().required().min(3).max(50),
      name: Joi.string().required().min(3).max(100)
    }).validate(data)
    if (error !== undefined) {
      throw new Error(error.message)
    }
  }

  validDataForUpdateUser (data: Omit<IUpdateUserRequestDTO, 'id'>): void {
    const {
      error
    } = Joi.object({
      email: Joi.string().required().min(3).max(50),
      name: Joi.string().required().min(3).max(100)
    }).validate(data)
    if (error !== undefined) {
      throw new Error(error.message)
    }
  }
}
export default HapiJoiValidationProvider
