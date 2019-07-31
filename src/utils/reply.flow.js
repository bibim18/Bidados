import { Client } from '@line/bot-sdk'
import config from '../configs'

const client = new Client({
  channelAccessToken: `${config.line.line_access}`
})

const list = []

const reply = async (reply_token, message) => {
  if (message.text.includes('add ')) {
    const text = message.text.split(' ')
    list.push(`${list.length+1}. ${text[1]}`)
  }
  const messages = [
    {
      type: 'text',
      text: `list --> ${list}`
    },
  ]
  const resp = await client.replyMessage(reply_token, messages)
}

export default reply
