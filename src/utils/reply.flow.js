import { Client } from '@line/bot-sdk'
import config from '../configs'
import todos from '../model/todos'
import { genarateMenu } from './genarateMenu.flow'
import { flexMsg } from './generateFlex.flow'
import R from 'ramda'

const client = new Client({
  channelAccessToken: `${config.line.line_access}`
})

const replaceWord = /add|แอด|เพิ่ม/i

const reply = async (reply_token, message) => {
  let text
  let story
  let todoList
  // keep text into list
  if (message.text.match(/add|แอด|เพิ่ม/i)) {
    text = message.text.replace(replaceWord, '').trim()
    let data = {
      title: text
    }
    const regex = /to|ใน\s+/i
    if (text.match(regex)) {
      // get new title and story
      story = text
        .slice(text.match(regex).index + 2)
        .trim()
        .toLowerCase()
      text = text.slice(0, text.match(regex).index - 1).trim()

      data = {
        title: text,
        story
      }
    }
    await todos.create(data)
    return client.replyMessage(reply_token, [
      {
        type: 'text',
        text: `Add ${text} in story ${story}`
      }
    ])
  } else {
    // show list
    if (/memory/i.test(message.text)) todoList = await todos.getAll('memory')
    if (/travel/i.test(message.text)) todoList = await todos.getAll('travel')
    if (/list/i.test(message.text)) todoList = await todos.getAll()

    let messages
    if (todoList) {
      messages = flexMsg(message.text, todoList)
      if (R.isEmpty(todoList)) {
        messages = [
          {
            type: 'text',
            text: `Not found list`
          }
        ]
      }
    }

    if (/menu/i.test(message.text)) {
      const list = await todos.getAll()
      messages = await genarateMenu(list)
    }

    if (messages) return client.replyMessage(reply_token, messages)
  }
}

export default reply
