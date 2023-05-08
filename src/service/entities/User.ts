interface IUserProps {
  id?: string
  name: string
  email: string
  password?: string
}
export class User {
  public id!: string
  public name!: string
  public email!: string
  public password!: string
  public createdAt?: Date
  public updatedAt?: Date

  constructor (props: IUserProps) {
    if (props.password === undefined) {
      this.password = ''
    }
    Object.assign(this, props)
  }
}
