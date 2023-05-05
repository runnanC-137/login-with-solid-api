const express = require('express')
const router = express.Router()
const {
  readAll,
  updateMyPassword,
  updateAnyOne, updateMe,
  updateMyPicture, updateYourPicture,
  deleteMe, deleteAnyOne,
  deleteMyPicture, deleteYourPicture
} = require('../controllers/user.js')
const permition = require('../middlewares/permitions')
const uploads = require('../middlewares/upload.js')

router.get('/', permition.administrador, readAll)
router.put('/image', uploads, updateMyPicture)
router.put('/image/:id', permition.administrador, uploads, updateYourPicture)
router.put('/senha', updateMyPassword)
router.put('/', updateMe)
router.put('/:id', permition.administrador, updateAnyOne)
router.delete('/', deleteMe)
router.delete('/:id', permition.administrador, deleteAnyOne)
router.delete('/image', deleteMyPicture)
router.delete('/image/:id', permition.administrador, deleteYourPicture)
module.exports = router
