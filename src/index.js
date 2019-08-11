import Koa from 'koa'
import Route from 'koa-router'
import bodyParser from 'koa-bodyparser'
import compress from 'koa-compress'
import cors from '@koa/cors'

import reply from './utils/reply.flow'
import {updateStatus} from './utils/flow'
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
    let reply_token = ctx.request.body.events[0].replyToken
    let resp = {}
    const postback = ctx.request.body.events[0].postback
    console.log(postback)
    const message = ctx.request.body.events[0].message
    if(message) resp = await reply(reply_token, message)
    if(postback) resp = await updateStatus(reply_token, postback.data)
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
