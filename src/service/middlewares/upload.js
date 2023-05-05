const Multer = require('multer')
const crypto = require('crypto')
const env = process.env.NODE_ENV || 'development'
const config = require('../../config/storage.js')[env]

const storage = () => {
  if (env === 'development') {
    return Multer.diskStorage({
      filename: (req, file, cb) => {
        crypto.randomBytes(16, (err, hash) => {
          if (err) cb(err)
          const fileName = `${hash.toString('hex')}-${Date.now()}.${file.originalname.toLocaleLowerCase().replace(/\s/g, '')}`
          cb(null, fileName)
        })
      },
      destination: (req, file, cb) => {
        cb(null, config.dest)
      }
    })
  } else return Multer.memoryStorage()
}

const multer = Multer({
  storage: storage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpg',
      'image/pjeg',
      'image/png'
    ]
    if (allowedMimes.includes(file.mimetype)) { cb(null, true) } else cb(new Error('Invalid file type'))
  }
})

// Process the file upload and upload to Google Cloud Storage.
module.exports = (req, res, next) => multer.single('image')(req, res, (err) => {
  if (!req.file) {
    return res.status(404).json({ error: { message: 'sem imagem', code: '004000' } })
  } else if (err) {
    return res.status(400).json({ error: { message: 'Error in middleware', code: '004001' } })
  }

  if (env === 'production') {
    crypto.randomBytes(16, (err, hash) => {
      if (err) {
        return res.status(400).json({ error: { message: 'Error in middleware', code: '004002' } })
      }
      const fileName = `${hash.toString('hex')}-${Date.now()}+${req.file.originalname.toLocaleLowerCase().replace(/\s/g, '')}`
      req.file.filename = fileName
    })
  }
  return next()
})
