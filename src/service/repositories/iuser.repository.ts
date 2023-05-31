import { type User } from '@/entities/user.entity'

export interface IUserRepository {
  user: any
  create: (user: User) => Promise<User>
  findById: (userId: string) => Promise<User | null>
  findByEmail: (email: string) => Promise<User | null>
  findAll: () => Promise<User[]>
  update: (user: User) => Promise<User>
  updatePassword: (user: User) => Promise<void>
  delete: (userId: string) => Promise<void>
}

/* class UserRepository {
    constructor(){
        if (this.constructor == UserRepository)
            throw new TypeError("")
        //methods
        ["create", "findByEmail", "findById", "verifyPassword"]
        .forEach(func => {
            if (this[func] == undefined || typeof this[func] != "function")
                throw new TypeError(`this class need a function ${func}`)
        });
    }
} */
