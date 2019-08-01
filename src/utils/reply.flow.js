import { Client } from '@line/bot-sdk'
import config from '../configs'
import todos from '../model/todos'

const client = new Client({
  channelAccessToken: `${config.line.line_access}`
})

const list = []

const reply = async (reply_token, message) => {
  if (message.text.includes('list')) {
    const todoList = await todos.getAll()
    return client.replyMessage(reply_token, [
      {
        type: 'text',
        text: `list\n${todoList.map(todo=> todo.title).join('\n')}`
      }
    ])
  }
  if (message.text.includes('add ') || message.text.includes('แอด ')) {
    const text =  message.text.replace('add','').trim()
    list.push(`${list.length+1}. ${text}`)
    const messages = [
      {
        type: 'text',
        text: `list\n${list.join('\n')}`
      },
    ]
    await client.replyMessage(reply_token, messages)
  }
}

export default reply
