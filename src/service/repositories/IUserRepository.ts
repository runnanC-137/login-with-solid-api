import { type User } from '../entities/User'

export interface IUserDataQueryProps {
  name?: string
}

export interface IUserRepository {
  create: (user: User) => Promise<User>
  findById: (userId: string) => Promise<User | undefined>
  findByEmail: (email: string) => Promise<User | undefined>
/*   findAll: () => Promise<User[]>
  findMany: (query: IUserDataQueryProps) => Promise<User[]> */
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
