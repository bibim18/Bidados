import { Client } from '@line/bot-sdk'
import config from '../configs'

const client = new Client({
  channelAccessToken: config.line.line_access
})

const message = {
  type: 'text',
  text: 'Hello!'
}

const reply = async reply_token => {
  await client.replyMessage(reply_token, message)
}

export default reply
