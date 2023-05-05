const { Storage } = require('@google-cloud/storage')

module.exports = ({ bucketName, projectId }, keyFilename) => {
  return async (urlOfImage) => {
    const imageName = urlOfImage.slice(49)
    const storage = new Storage({ projectId, keyFilename })
    // Obtenha uma referência ao objeto de imagem que deseja excluir
    const image = storage.bucket(bucketName).file(imageName)
    try {
      await image.delete()
      console.log(`Imagem ${imageName} excluída com sucesso.`)
    } catch (err) {
      console.error('Erro ao excluir imagem:', err)
    }
  }
}
