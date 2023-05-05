import { type Bucket, Storage } from '@google-cloud/storage'
import type IUploadProvider from '../IUploadProvider'
import { googleCould, keyFilename } from '../../../config/googleCloud'
// import path from 'path'

class CloudUploadProvider implements IUploadProvider {
  private readonly storage: Storage
  private readonly bucket: Bucket
  // A bucket is a container for objects (files).
  constructor () {
    const { projectId, bucketName } = googleCould /* path.join(__dirname, 'cloud.json') */

    this.storage = new Storage({
      keyFilename: JSON.stringify(keyFilename) /* keyFilename */,
      projectId
    })
    this.bucket = this.storage.bucket(bucketName)
  }

  async uploadImage (file: any): Promise<string> {
    console.log(file, 'filename')
    const blob = this.bucket.file(file.filename)
    const blobStream = blob.createWriteStream({
      // resumable: false,
      metadata: {
        contentType: file.mimetype
      },
      public: true // torna o objeto público
    })

    blobStream.on('error', (err: any) => {
      console.log(err)
      throw Error(err)
    })

    blobStream.on('finish', () => {
      console.log('finish')
    })

    blobStream.end(file.buffer)

    return `https://storage.googleapis.com/${this.bucket.name}/${blob.name}`
  }

  async deleteImage (urlOfImage: string): Promise<void> {
    const imageName = urlOfImage.slice(49)
    // Obtenha uma referência ao objeto de imagem que deseja excluir
    const image = this.storage.bucket(this.bucket.name).file(imageName)
    try {
      await image.delete()
      console.log(`Imagem ${imageName} excluída com sucesso.`)
    } catch (err) {
      console.error('Erro ao excluir imagem:', err)
    }
  }
}

export default CloudUploadProvider
