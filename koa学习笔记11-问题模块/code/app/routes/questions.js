const jwt = require('koa-jwt')
const Router = require('koa-router')
const router = new Router({prefix: '/questions'})
const {find,findById,create,update,delete: del,checkQuestionExist,checkQuestioner} = require('../controllers/questions')

const { secret } = require('../config')

const auth = jwt({secret})


// 用户列表
router.get('/', find)

// 获取特定问题
router.get('/:id',checkQuestionExist, findById)

// 创建用户
router.post('/', auth, create)

// 修改用户
router.patch('/:id',auth,checkQuestionExist,checkQuestioner, update)

// 删除
router.delete('/:id',auth,checkQuestionExist,checkQuestioner, del)




module.exports = router