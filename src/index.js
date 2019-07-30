import express from 'express'
import bodyParser from 'body-parser'
import axios from 'axios'
import config from './configs'

const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/webhook', async (req, res) => {
    console.log(req.body)
    let reply_token = req.body.events[0].replyToken
    const resp = await reply(reply_token)
    res.sendStatus(200)
})
const reply = async reply_token => {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer {${config.line.line_access}}`
    }
    let body = {
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: 'Hello'
        },
        {
            type: 'text',
            text: 'How are you?'
        }]
    }
    const resp = await axios.post('https://api.line.me/v2/bot/message/reply',
    body,
    { headers }
    )

    console.log('resp of line api ', resp)
}

app.listen(port, () => {
    console.log(`Run in port ${port}` )
})
