import type ICreateUserRequestDTO from '../use-case/create-user/ICreateUserDTO'
import type IUpdateUserRequestDTO from '../use-case/update-user/IUpdateUserDTO'

interface IValidationProvider {
  validDataForCreateUser: (data: ICreateUserRequestDTO) => void
  validDataForUpdateUser: (data: Omit<IUpdateUserRequestDTO, 'id'>) => void
  // validDataForUpdateUserPassword: (data) => boolean
}
export default IValidationProvider
