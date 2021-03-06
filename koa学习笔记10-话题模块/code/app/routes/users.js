const jwt = require('koa-jwt')
const Router = require('koa-router')
const router = new Router({prefix: '/users'})
const {find,findById,create,update,del,login,checkOwner,checkUserExist,listFollowing,
  listFollowers,follow,unfollow,followTopic,unfollowTopic,listFollowingTopics} = require('../controllers/users')

const { checkTopicExist } = require('../controllers/topics')
const { secret } = require('../config')

const auth = jwt({secret})


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

// 关注的人
router.get('/:id/following', listFollowing)

// 获取某人的粉丝列表
router.get('/:id/listFollowers',listFollowers)

// 关注某人
router.put('/following/:id', auth, checkUserExist, follow)

// 取消关注某人
router.delete('/following/:id', auth, checkUserExist, unfollow)

// 关注的话题
router.get('/:id/followingTopic', listFollowingTopics)

// 关注话题
router.put('/followingTopic/:id', auth, checkTopicExist, followTopic)

// 取消关注话题
router.delete('/followingTopic/:id', auth, checkTopicExist, unfollowTopic)



module.exports = router