const jwt = require('koa-jwt')
const Router = require('koa-router')
const router = new Router({prefix: '/questions/:questionId/answers/:answerId/comments'})
const {find,findById,create,update,delete: del,checkCommentExist,checkCommentator} = require('../controllers/comments')

const { secret } = require('../config')

const auth = jwt({secret})


// 用户列表
router.get('/', find)

// 获取特定问题
router.get('/:id',checkCommentExist, findById)

// 创建用户
router.post('/', auth, create)

// 修改用户
router.patch('/:id',auth,checkCommentExist,checkCommentator, update)

// 删除
router.delete('/:id',auth,checkCommentExist,checkCommentator, del)




module.exports = router