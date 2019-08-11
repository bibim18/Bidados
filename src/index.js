import Koa from 'koa'
import Route from 'koa-router'
import bodyParser from 'koa-bodyparser'
import compress from 'koa-compress'
import cors from '@koa/cors'

import reply from './utils/reply.flow'
import config from './configs'



import todos from './model/todos'

import serviceAccount from '../bidados.credential.json'

const app = new Koa()
const router = new Route()
const port = config.line.port



router.get('/test', async (ctx,next)=> {
  const results = await todos.getAll()
  ctx.body = results
})

router.post('/webhook', async (ctx, next) => {
  console.log('context\n', ctx)
    let reply_token = ctx.request.body.events[0].replyToken
    const message = ctx.request.body.events[0].message
    const resp = await reply(reply_token, message)
  ctx.body = resp
})

app.use(bodyParser())
app.use(compress())
app.use(cors())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(port, () => {
  console.log(`Run in port ${port}`)
})
