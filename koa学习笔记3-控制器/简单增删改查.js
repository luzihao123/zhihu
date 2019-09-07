// 用新建一个对象模拟数据  ctx.request.body 接收body参数
// ctx.params.id 接收路由参数 *1转为数字格式
// ctx.set() 方法可设置响应头

const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const router = new Router()
const usersRouter = new Router({prefix: '/users'})

const db = [{name: '李雷'}]

router.get('/', (ctx)=>{
  ctx.body = '这是首页'
})

// 用户列表
usersRouter.get('/', (ctx)=>{
  // ctx.set('Allow', 'GET POST')   模拟设置响应头
  ctx.body = db
})

// 获取特定用户
usersRouter.get('/:id', (ctx)=>{
  ctx.body = db[ctx.params.id * 1]  // 字符串转数字
})

// 创建用户
usersRouter.post('/', (ctx)=>{
  db.push(ctx.request.body)
  ctx.body = ctx.request.body
})

// 修改用户
usersRouter.put('/:id', (ctx)=>{
  db[ctx.params.id * 1] = ctx.request.body
  ctx.body = ctx.request.body
})

// 删除用户
usersRouter.delete('/:id', (ctx)=>{
  db.splice(ctx.params.id * 1,1)
  ctx.status = 204
})

app.use(bodyParser())
app.use(router.routes())
app.use(usersRouter.routes())
app.use(usersRouter.allowedMethods())
app.listen(3000)