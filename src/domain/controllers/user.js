const { User, Image } = require('../models')
const { hashSync, compareSync } = require('bcryptjs')
const imageController = require('../utils/images')
const { validation } = require('../utils/validation')

const readAll = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    })
    return res.json(users)
  } catch (error) {
    return res.status(400).json({ error: { message: 'error na procura dos usuários', code: '001000' } })
  }
}

const updateMe = async (req, res) => {
  const { name, email } = req.body
  if (!email || !name) {
    return res.status(400).json({ error: { message: 'O campo de matricula e senha são obrigatórios', code: '001001' } })
  }
  const { user } = req
  try {
    const upUser = await user.update({ name, email })
    delete upUser.dataValues.password
    return res.json({ user: upUser })
  } catch (err) {
    console.log(err)
    return res.status(400).json({ error: { message: 'erro na atualização de usuário', code: '001002', err } })
  }
}

const updateMyPassword = async (req, res) => {
  const { password, newPassword } = req.body
  const { user } = req
  if (!newPassword || !password) { return res.status(400).json({ error: { message: 'O campo de email e senha são obrigatórios', code: '001003' } }) }
  const hashPassword = hashSync(newPassword)
  try {
    const isPasswordValid = compareSync(password, user.password)
    if (!isPasswordValid) { return res.status(404).json({ error: { message: 'senha ou email incorreto', code: '001004' } }) }
    await user.update({ password: hashPassword })
    return res.json({ message: 'senha alterada com sucesso' })
  } catch (err) {
    console.log(err)
    return res.status(404).json({ error: { message: 'erro na troca de senha', code: '001005', err } })
  }
}

const updateMyPicture = async (req, res) => {
  const { user, file } = req
  try {
    const { url } = await imageController.upload(file)
    if (user.imageId) {
      const image = await Image.findByPk(user.imageId)
      await imageController.delete(image.url)
      await image.update({ url })
      return res.json(image)
    } else {
      const image = await Image.create({ url })
      await user.update({ imageId: image.id })
      return res.json(image)
    }
  } catch (err) {
    console.log(err)
    return res.status(404).json({ error: { message: 'erro no atualização de imagem', code: '001006', err } })
  }
}

const updateYourPicture = async (req, res) => {
  const { id } = req.params
  if (!id) { return res.status(400).json({ error: { message: 'O campo de matricula e senha são obrigatórios', code: '001007' } }) }
  const { file } = req
  try {
    const user = await User.findByPk(id)
    if (!user) { return res.status(404).json({ error: { message: 'usuário inexistente', code: '001008' } }) }
    const { url } = await imageController.upload(file)
    if (user.imageId) {
      const image = await Image.findByPk(user.imageId)
      await imageController.delete(image.url)
      await image.update({ url })
      return res.json(image)
    } else {
      const image = await Image.create({ url })
      await user.update({ imageId: image.id })
      return res.json(image)
    }
  } catch (err) {
    console.log(err)
    return res.status(404).json({ error: { message: 'erro na atualização geral de usuário', code: '001009', err } })
  }
}

const deleteMyPicture = async (req, res) => {
  const { user } = req
  try {
    if (user.imageId) {
      const image = await Image.findByPk(user.imageId)
      await imageController.delete(image.url)
      await image.destroy()
      return res.json('imagem destruída com sucesso')
    } else { return res.status(404).json({ error: { message: 'O usuário não tem foto', code: '001010' } }) }
  } catch (err) {
    console.log(err)
    return res.status(404).json({ error: { message: 'erro no delete de imagem', code: '001011', err } })
  }
}

const deleteYourPicture = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({ error: { message: 'O campo de matricula e senha são obrigatórios', code: '001012' } })
  }
  try {
    const user = await User.findByPk(id)
    if (!user) { return res.status(404).json({ error: { message: 'usuário inexistente', code: '001013' } }) }
    if (user.imageId) {
      const image = await Image.findByPk(user.imageId)
      await imageController.delete(image.url)
      await image.destroy()
      return res.json(image)
    } else return res.status(404).json({ error: { message: 'Vc não tem uma imagem', code: '0010134' } })
  } catch (err) {
    console.log(err)
    res.status(404).json({ error: { message: 'erro no delete de imagem de usuário', code: '001015', err } })
  }
}

const updateAnyOne = async (req, res) => {
  const { name, email } = req.body
  const { id } = req.params
  if (!email || !id || !name) { return res.status(400).json({ error: { message: 'O campo de matricula e senha e id são obrigatórios', code: '001016' } }) }
  const { error } = validation(req.body, false)
  if (error) { return res.status(400).json({ error: { message: error.message, code: '001017', error } }) }
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    })
    if (!user) { return res.status(404).json({ error: { message: 'usuário inexistente', code: '001018' } }) }
    const upUser = await user.update({ name, email })
    return res.json({ user: upUser })
  } catch (err) {
    console.log(err)
    res.status(404).json({ error: { message: 'error na atualização geral de usuário', code: '001019', err } })
  }
}

const deleteMe = async (req, res) => {
  const { user } = req
  try {
    await user.destroy()
    return res.json({ message: 'usuário deletado com sucesso' })
  } catch (err) {
    console.log(err)
    res.status(404).json({ error: { message: 'erro no delete de usuário', code: '001020', err } })
  }
}

const deleteAnyOne = async (req, res) => {
  const { id } = req.params
  if (!id) { return res.status(400).json({ error: { message: 'O campo de id nos parâmetros é obrigatório', code: '001021' } }) }
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    })
    if (!user) { return res.status(404).json({ error: { message: 'usuário inexistente', code: '001022' } }) }
    await user.destroy()
    return res.json({ message: 'user destroyed with success' })
  } catch (err) {
    console.log(err)
    res.status(404).json({ error: { message: 'erro no delete geral de usuário', code: '001023', err } })
  }
}

module.exports = {
  readAll,
  updateMe,
  updateMyPicture,
  updateYourPicture,
  updateMyPassword,
  updateAnyOne,
  deleteMe,
  deleteAnyOne,
  deleteMyPicture,
  deleteYourPicture
}
