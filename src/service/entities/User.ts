import { v4 as uuidv4 } from 'uuid'

interface IUserProps {
  name: string
  email: string
  password?: string
  createAt?: string
  updateAt?: string
}
export class User {
  public readonly id: string
  public name!: string
  public email!: string
  public password?: string
  public createAt?: string
  public updateAt?: string

  constructor (props: IUserProps, id?: string) {
    Object.assign(this, props)
    this.password = props.password
    if (id != null) {
      this.id = id
    } else {
      this.id = uuidv4()
      /* this.createAt = this.getData()
      this.updateAt = this.getData() */
    }
  }

  /*   private getData (): string {
    const hoje = new Date()
    // const dia = hoje.getDate().toString().padStart(2, '0')
    // const mes = String(hoje.getMonth() + 1).padStart(2, '0')
    // const ano = hoje.getFullYear()
    const hora = hoje.toLocaleString()
    // const dataAtual = `${dia}/${mes}/${ano} as ${hora}`
    return hora
  } */

  public updateDate (newDate: string): void {
    // this.updateAt = this.getData()
    this.updateAt = newDate
  }

  public Setpassword (password: string): void {
    this.password = password
  }

  public Getpassword (): string {
    if (this.password !== undefined) {
      return this.password
    }
    return ''
  }
}
