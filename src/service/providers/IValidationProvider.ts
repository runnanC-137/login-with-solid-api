import type ICreateUserRequestDTO from '../use-case/create-user/icreate-user-DTO'
import type IUpdateUserRequestDTO from '../use-case/update-user/iupdate-user-DTO'

interface IValidationProvider {
  validDataForCreateUser: (data: ICreateUserRequestDTO) => void
  validDataForUpdateUser: (data: Omit<IUpdateUserRequestDTO, 'id'>) => void
  // validDataForUpdateUserPassword: (data) => boolean
}
export default IValidationProvider
