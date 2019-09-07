const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const routing = require('./routes')

app.use(bodyParser())
routing(app)
app.listen(3000, ()=> console.log('启动在3000'))