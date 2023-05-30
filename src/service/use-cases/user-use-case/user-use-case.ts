import { User } from '@/entities/User'
import { IHashProvider } from '@/providers/ihash-provider'
import { IUserRepository } from '@/repositories/IUserRepository'
import { CreateUserRequestDTO } from '@/dtos/create-user-dto'
import { UpdateUserRequestDTO } from '@/dtos/update-user-dto'
import { FindUserByIdRequestDTO } from '@/dtos/read-user-byId-dto'
import { UpdateUserPasswordRequestDTO } from '@/dtos/update-user-password-dto'

export class UserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private hashProvider: IHashProvider,
  ) {}

  async create(data: CreateUserRequestDTO): Promise<User> {
    const userAlreadyExit = await this.userRepository.findByEmail(data.email)
    if (userAlreadyExit != null) {
      throw new Error('user already exit')
    }
    const userData = new User(data)
    const hashPassword = this.hashProvider.hashPassword(data.password)
    userData.password = hashPassword
    const user = await this.userRepository.create(userData)
    return user
  }

  async read({ id }: FindUserByIdRequestDTO): Promise<User> {
    const findUser = await this.userRepository.findById(id)
    if (!findUser) {
      throw new Error('user not exist')
    }
    return findUser
  }

  async readAll(): Promise<User[]> {
    return await this.userRepository.findAll()
  }

  // readAll
  // readMany
  async update(data: UpdateUserRequestDTO): Promise<User> {
    const userExit = await this.userRepository.findById(data.id)
    if (!userExit) {
      throw new Error('user not exit')
    }

    if (data.email) {
      const emailAlreadyExit = await this.userRepository.findByEmail(data.email)
      if (emailAlreadyExit) {
        throw new Error('user email is already in use')
      }
    }

    const updateUserData = new User({
      id: userExit.id,
      name: data.name ?? userExit.name,
      email: data.email ?? userExit.email,
      updatedAt: new Date(),
    })
    const updateUser = await this.userRepository.update(updateUserData)
    return updateUser
  }

  async updatePassword(data: UpdateUserPasswordRequestDTO): Promise<void> {
    const userExit = await this.userRepository.findById(data.id)

    if (!userExit) {
      throw new Error('user not exit')
    }

    const isPasswordTruth = this.hashProvider.verifyPassword(
      data.password,
      userExit.password,
    )

    if (!isPasswordTruth) {
      throw new Error('password incorrectly')
    }

    const hashPassword = this.hashProvider.hashPassword(data.newPassword)

    const updateUserData = new User({
      id: userExit.id,
      name: userExit.name,
      email: userExit.email,
      password: hashPassword,
    })

    await this.userRepository.updatePassword(updateUserData)
  }

  async delete({ id }: FindUserByIdRequestDTO): Promise<void> {
    const userAlreadyExit = await this.userRepository.findById(id)
    if (userAlreadyExit === undefined) {
      throw new Error('user not exist')
    }
    await this.userRepository.delete(id)
  }
}
