// 搭建第一个koa服务

// npm init
// npm i koa --save
// npm i nodemon --save-dev
// npm start
// app.use为使用中间件，next为下一个中间件，next()为异步函数，要理解koa洋葱模型，先依次进入，再依次退出
// 在package.json 中加入
//  "scripts": {
//     "start": "nodemon index.js"
//   }
// 新建index.js文件


const Koa = require('koa')
const app = new Koa()

app.use(async (ctx,next)=>{
  await next()
  console.log('1')
  ctx.body = 'helldo world'
})

app.use((ctx)=>{
  console.log('2')
})

app.listen(3000)



