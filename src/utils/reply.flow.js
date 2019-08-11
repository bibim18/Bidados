import { Client } from '@line/bot-sdk'
import config from '../configs'
import todos from '../model/todos'
import { genarateMenu, flexMsg } from './replyMsg'
import createDataToList from './flow'
import R from 'ramda'

const client = new Client({
  channelAccessToken: `${config.line.line_access}`
})

const replaceWord = /add|แอด|เพิ่ม/i

const reply = async (reply_token, message) => {
  let text = message.text
  let story
  let todoList
  // keep text into list
  if (message.text.match(/add|แอด|เพิ่ม/i)) {
    text = text.replace(replaceWord, '').trim()
    story = await createDataToList(text)
    return client.replyMessage(reply_token, [
      {
        type: 'text',
        text: `Added ${text} in story ${story}`
      }
    ])
  } else {
    let messages
    // show list
    if (text.match(/list /)) {
      text = text
        .slice(text.match(/list /).index + 4)
        .trim()
        .toLowerCase()
      todoList = await todos.getAll(text)
      if (/all/i.test(message.text)) todoList = await todos.getAll()

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
    }
    if (/menu/i.test(message.text)) {
      const list = await todos.getAll()
      messages = await genarateMenu(list)
    }

    if (messages) return client.replyMessage(reply_token, messages)
  }
}

export default reply
