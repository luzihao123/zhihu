// 比较规范的增删改查写法
// 用get 得到用户列表 或 特定用户
// post 新增    返回新建信息
// put  修改    返回修改后信息
// delete 删除  返回204状态  (成功，无数据)


const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()
const usersRouter = new Router({prefix: '/users'})

router.get('/', (ctx)=>{
  ctx.body = '这是首页'
})

// 用户列表
usersRouter.get('/', (ctx)=>{
  ctx.body = [{name: 'a'},{name: 'b'}]
})

// 获取特定用户
usersRouter.get('/:id', (ctx)=>{
  ctx.body = {name: 'lilei'}
})

// 创建用户
usersRouter.post('/', (ctx)=>{
  ctx.body = {name: 'lilei'}
})

// 修改用户
usersRouter.put('/:id', (ctx)=>{
  ctx.body = {name: 'lilei2'}
})

// 删除用户
usersRouter.delete('/:id', (ctx)=>{
  ctx.status = 204
})

app.use(router.routes())
app.use(usersRouter.routes())
app.use(usersRouter.allowedMethods())
app.listen(3000)