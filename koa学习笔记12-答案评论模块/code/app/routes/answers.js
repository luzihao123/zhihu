const jwt = require('koa-jwt')
const Router = require('koa-router')
const router = new Router({prefix: '/questions/:questionId/answers'})
const {find,findById,create,update,delete: del,checkAnswerExist,checkAnswerer} = require('../controllers/answer')

const { secret } = require('../config')

const auth = jwt({secret})


// 用户列表
router.get('/', find)

// 获取特定问题
router.get('/:id',checkAnswerExist, findById)

// 创建用户
router.post('/', auth, create)

// 修改用户
router.patch('/:id',auth,checkAnswerExist,checkAnswerer, update)

// 删除
router.delete('/:id',auth,checkAnswerExist,checkAnswerer, del)




module.exports = router