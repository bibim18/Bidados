import { Client } from '@line/bot-sdk'
import config from '../configs'
import todos from '../model/todos'

const client = new Client({
  channelAccessToken: `${config.line.line_access}`
})

const replaceWord = /add|Add|แอด|เพิ่ม/
let todoList

const reply = async (reply_token, message) => {
  let text
  let story
  // keep text into list
  if (message.text.match(/add|แอด|เพิ่ม/i)) {
    text = message.text.replace(replaceWord, '').trim()
    let data = {
      title: text
    }
    const regex = /to\s+/
    if (text.match(regex)) {
      // get new title and story
      story = text.slice(text.match(regex).index + 2).trim()
      text = text.slice(0, text.match(regex).index - 1).trim()

      data = {
        title: text,
        story
      }
    }
    await todos.create(data)
  } else {
    // show list
    if (message.text === 'memorize' || message.text === 'memory')
      todoList = await todos.getAll('memorize')
    if (message.text === 'list') todoList = await todos.getAll()

    return client.replyMessage(reply_token, [
      {
        type: 'text',
        text: `list\n${todoList.map(todo => todo.title).join('\n')}`
      }
    ])
  }
}

export default reply
