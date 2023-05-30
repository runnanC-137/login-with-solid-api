import Joi from '@hapi/joi'
import { CreateUserRequestDTO } from '@/dtos/create-user-dto'
import { UpdateUserRequestDTO } from '@/dtos/update-user-dto'
import { IValidationProvider } from '../ivalidation-provider'

export class HapiJoiValidationProvider implements IValidationProvider {
  public validDataForCreateUser(data: CreateUserRequestDTO): void {
    const { error } = Joi.object({
      password: Joi.string().required().min(6).max(400),
      email: Joi.string().required().min(3).max(50),
      name: Joi.string().required().min(3).max(100),
    }).validate(data)
    if (error !== undefined) {
      throw new Error(error.message)
    }
  }

  validDataForUpdateUser(data: Omit<UpdateUserRequestDTO, 'id'>): void {
    const { error } = Joi.object({
      email: Joi.string().min(7).max(50),
      name: Joi.string().min(3).max(100),
    }).validate(data)
    if (error !== undefined) {
      throw new Error(error.message)
    }
  }

  public validDataForUpdatePasswordUser(data: { newPassword: any }): void {
    const { error } = Joi.object({
      newPassword: Joi.string().required().min(6).max(400),
    }).validate(data)
    if (error !== undefined) {
      throw new Error(error.message)
    }
  }
}
