const jwt = require('koa-jwt')
const Router = require('koa-router')
const router = new Router({prefix: '/topics'})
const {find,findById,create,update,checkTopicExist,listTopicFollowers} = require('../controllers/topics')

const { secret } = require('../config')

const auth = jwt({secret})


// 用户列表
router.get('/', find)

// 获取特定用户
router.get('/:id',checkTopicExist, findById)

// 创建用户
router.post('/', auth, create)

// 修改用户
router.patch('/:id',auth,checkTopicExist, update)

// 获取话题粉丝
router.get('/:id/followers', checkTopicExist,listTopicFollowers)



module.exports = router