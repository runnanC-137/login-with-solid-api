interface IUserProps {
  id?: string
  name: string
  email: string
  password?: string
  createdAt?: Date
  updatedAt?: Date
}

export class User {
  id?: string
  name: string
  email: string
  password: string
  createdAt?: Date
  updatedAt?: Date

  constructor(props: IUserProps) {
    Object.assign(this, props)
  }
}
