const jsonwebtoken = require('jsonwebtoken')
const Router = require('koa-router')
const router = new Router({prefix: '/users'})
const {find,findById,create,update,del,login,checkOwner} = require('../controllers/users')

const {secret} = require('../config')

const auth = async (ctx, next) => {
  const {authorization=''} = ctx.request.header
  const token = authorization.replace('Bearer ','')
  try{
    const user = jsonwebtoken.verify(token, secret)
    ctx.state.user =  user
  }catch(err){
    ctx.throw(401, err.message)
  }
  await next()
}


// 用户列表
router.get('/', find)

// 获取特定用户
router.get('/:id', findById)

// 创建用户
router.post('/', create)

// 修改用户
router.patch('/:id',auth, checkOwner, update)

// 删除用户
router.delete('/:id',auth, checkOwner, del)

// 登录
router.post('/login', login)

module.exports = router