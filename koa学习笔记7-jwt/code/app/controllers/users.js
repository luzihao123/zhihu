const User = require('../models/users')
const jsonwebtoken = require('jsonwebtoken')
const {secret} = require('../config')
class UsersCtl {
  async find(ctx) {
    ctx.body = await User.find()
  }
  async findById(ctx) {
    const user = await User.findById(ctx.params.id)
    if (!user) {
      ctx.throw(404, '用户不存在')
    }
    ctx.body = user
  }
  async create(ctx) {
    ctx.verifyParams({
      name: {type: 'string', required: true},
      password: {type: 'string', required: true},
    })
    const { name } = ctx.request.body
    const repeatedUser = await User.findOne({name})
    if (repeatedUser) {ctx.throw(409,'用户被占用')}
    const user = await new User(ctx.request.body).save()
    ctx.body = user
  }
  async update(ctx) {
    ctx.verifyParams({
      name: {type: 'string', required: false },
      password: {type: 'string', required: false},
    })
    const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body)
    if (!user) {
      ctx.throw(404)
    }
    ctx.body = user
  }
  async del(ctx) {
    const user = await User.findByIdAndRemove(ctx.params.id)
    if (!user) {ctx.throw(404)}
    ctx.status = 204
  }
  async login(ctx) {
    ctx.verifyParams({
      name: {type: 'string', required: true },
      password: {type: 'string', required: true},
    })
    const user = await User.findOne(ctx.request.body)
    if (!user) {ctx.throw(401, '用户名或密码不正确')}
    const {_id, name} = user
    const token = jsonwebtoken.sign({_id, name},secret, {expiresIn: '1d'})
    ctx.body = {token}
  }

  async checkOwner(ctx,next) {
    if (ctx.params.id !== ctx.state.user._id) {ctx.throw(403, '无权限')}
    await next()
  }
}  

module.exports = new UsersCtl()