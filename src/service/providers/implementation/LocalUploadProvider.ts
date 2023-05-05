import { development } from '../../../config/locaStorage'
import type IUploadProvaider from '../IUploadProvider'
import fse from 'fs-extra'
interface IUploadImage {
  filename: string
}
class LocalUploadProvider implements IUploadProvaider {
  private readonly host: string
  private readonly port: string
  constructor () {
    const { host, port } = development
    this.host = host
    this.port = port
  }

  async uploadImage (file: IUploadImage): Promise<string> {
    const url = `http://${this.host}:${this.port}/images/${file.filename}`
    return url
  }

  async deleteImage (urlOfImage: string): Promise<void> {
    try {
      const url = `./localStorage/${urlOfImage.slice(29)}`
      const exists: boolean = await fse.pathExists(url)
      if (exists) {
        await fse.remove(`./localStorage/${urlOfImage.slice(29)}`)
      }
    } catch (err) {
      console.log(err)
      throw Error('Erro: ao excluir imagem')
    }
  }
}

export default LocalUploadProvider
