
interface IUserProps {
  id?: string
  name: string
  email: string
  password?: string
  createdAt?: Date
  updatedAt?: Date
}

export class User {
  constructor (private props: IUserProps) {
    Object.assign(this, props)
  }

  get data() {
    return this.props
  }
  
  /* get id(): string {
    return this.props.id
  } */
  set id(id: string) {
    this.props.id = id
  }

  get name() {
    return this.props.name
  }
  set name(name: string) {
    this.props.name = name
  }

  get email() {
    return this.props.email
  }
  set email(email: string) {
    this.props.email = email
  }

  get password() {
    return this.props.email
  }
  set password(password: string) {
    this.props.password = password
  }

  get createdAt() {
    return this.props.createdAt
  }

  /* get updatedAt() {
    return this.props.updatedAt
  } */
  set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt
  }
}
