import todos from '../../model/todos'
import { Client } from '@line/bot-sdk'
import { getURLParameters } from '../flow'
import config from '../../configs'

const client = new Client({
  channelAccessToken: `${config.line.line_access}`
})

export const updateStatus = async (reply_token, data) => {
  const { id, status, title } = getURLParameters(data)
  await todos.update(id, status)
  return client.replyMessage(reply_token, [
    {
      type: 'text',
      text: `updated ${title} to ${status} success!`
    }
  ])
}
