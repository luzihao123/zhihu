const db = [{name: '李雷'}]
class UsersCtl {
  find(ctx) {
    // ctx.set('Allow', 'GET POST')   模拟设置响应头
    ctx.body = db
  }
  findById(ctx) {
    ctx.body = db[ctx.params.id * 1]  // 字符串转数字
  }
  create(ctx) {
    db.push(ctx.request.body)
    ctx.body = ctx.request.body
  }
  update(ctx) {
    db[ctx.params.id * 1] = ctx.request.body
    ctx.body = ctx.request.body
  }
  del(ctx) {
    db.splice(ctx.params.id * 1,1)
    ctx.status = 204
  }
} 

module.exports = new UsersCtl()