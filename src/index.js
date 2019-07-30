import Koa from 'koa'
import Route from 'koa-router'
import bodyParser from 'koa-bodyparser'
import compress from 'koa-compress'
import cors from '@koa/cors'
import reply from './utils/reply.flow'

const app = new Koa()
const router = new Route()
const port = process.env.PORT || 4000

router.post('/webhook', async (ctx, next) => {
    let reply_token = ctx.request.body.events[0].replyToken
    const resp = await reply(reply_token)
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
