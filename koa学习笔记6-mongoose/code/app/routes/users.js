const Router = require('koa-router')
const router = new Router({prefix: '/users'})
const {find,findById,create,update,del} = require('../controllers/users')
// 用户列表
router.get('/', find)

// 获取特定用户
router.get('/:id', findById)

// 创建用户
router.post('/', create)

// 修改用户
router.put('/:id', update)

// 删除用户
router.delete('/:id', del)

module.exports = router