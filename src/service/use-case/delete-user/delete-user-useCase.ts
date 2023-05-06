import { type IUserRepository } from '../../repositories/IUserRepository'
import { type IDeleteUserRequestDTO } from './delete-user-DTO'

export class DeleteUserUseCase {
  constructor (
    private readonly userRepository: IUserRepository
  ) {
  }

  async execute ({ id }: IDeleteUserRequestDTO): Promise<void> {
    const userAlreadyExit = await this.userRepository.findById(id)
    // console.log(userAlreadyExit, 'delete')
    if (userAlreadyExit === undefined) {
      throw new Error('user not exist')
    }
    await this.userRepository.delete(id)
  }
}
