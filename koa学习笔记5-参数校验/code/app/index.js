const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const error = require('koa-json-error')
const parameter = require('koa-parameter')
const app = new Koa()
const routing = require('./routes')

app.use(error({
  postFormat: (err, {stack,...rest} ) => process.env.NODE_ENV === 'production' ? rest : {stack,rest}
}))
app.use(bodyParser())
app.use(parameter(app))
routing(app)
app.listen(3000, ()=> console.log('启动在3000'))