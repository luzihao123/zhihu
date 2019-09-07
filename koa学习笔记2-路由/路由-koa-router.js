// 实现路由前缀，多中间件
// 前缀写法  new Router({prefix: '/users'})
// 多中间件  模拟一个权鉴函数 放在路由第二个参数
// http.options 方法 响应options  告诉请求它所支持的方法 app.use(usersRouter.allowedMethods())
// 相应的返回405(不允许) 501(没实现)

const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()
const usersRouter = new Router({prefix: '/users'})

const auth = async (ctx,next) => {
  if (ctx.url !== '/users') {
    ctx.throw(401)  
  }
  await next()
}

router.get('/', (ctx)=>{
  ctx.body = '这是主页'
})

usersRouter.get('/', auth, (ctx)=>{
  ctx.body = '这是用户列表'
})

usersRouter.post('/', auth, (ctx)=>{
  ctx.body = '这是创建用户接口'
})

usersRouter.get('/:id', auth, (ctx)=>{
  ctx.body = `这是用户 ${ctx.params.id}`
})

app.use(router.routes())
app.use(usersRouter.routes())
app.use(usersRouter.allowedMethods())
app.listen(3000)