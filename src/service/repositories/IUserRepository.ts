import type User from '../entities/User'

export default interface IUserRepository {
  create: (user: User) => Promise<void>
  findById: (userId: string) => Promise<User | undefined>
  findByEmail: (email: string) => Promise<User | undefined>
  update: (user: User) => Promise<User>
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
