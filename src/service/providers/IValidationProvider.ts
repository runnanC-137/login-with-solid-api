import { CreateUserRequestDTO } from '../dtos/create-user-dto'
import { UpdateUserRequestDTO } from '../dtos/update-user-dto'

export interface IValidationProvider {
  validDataForCreateUser: (data: CreateUserRequestDTO) => void
  validDataForUpdateUser: (data: Omit<UpdateUserRequestDTO, 'id'>) => void
  // validDataForUpdateUserPassword: (data) => boolean
}

