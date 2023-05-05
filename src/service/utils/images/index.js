require('dotenv').config()
const path = require('path')
const env = process.env.NODE_ENV || 'development'
const config = require('../../config/storage.js')[env]
const image = {}

if (env === 'development') {
  const fse = require('fs-extra')
  image.delete = async (filename) => {
    try {
      const url = `./localStorage/${filename.slice(29)}`
      const exists = await fse.pathExists(url)
      if (exists) { await fse.remove(`./localStorage/${filename.slice(29)}`) }
    } catch (err) {
      console.log(err)
      throw Error('Erro: ao excluir imagem')
    }
  }
  image.upload = async (file) => {
    let url = config.ssl ? 'http://' : 'http://'
    url += config.host + ':' + config.port + '/images/' + file.filename
    return { url }
  }
} else {
  const keyFilename = path.join(__dirname, 'cloud.json')
  image.upload = require('./upload')(config, keyFilename)
  image.delete = require('./delete')(config, keyFilename)
}

module.exports = image
