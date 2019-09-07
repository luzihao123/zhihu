// koa获得post请求body的差距  koa-bodyparser   安装后在app.use中使用

// 断点调试步骤: 1.创建断点 2.在vscode中直接按F5 3.在postman中发起请求 4.在vscode左侧可看到ctx.params  ctx.query ctx.request.body ctx.headers 等

// 为方便查看  可在监视中输入ctx.params 等变量名   



const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const router = new Router()
const usersRouter = new Router({prefix: '/users'})

router.get('/', (ctx)=>{
  ctx.body = '这是首页'
})

// 用户列表
usersRouter.get('/', (ctx)=>{
  ctx.body = [{name: 'ad'},{name: 'b'}]
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

app.use(bodyParser())
app.use(router.routes())
app.use(usersRouter.routes())
app.use(usersRouter.allowedMethods())
app.listen(3000)