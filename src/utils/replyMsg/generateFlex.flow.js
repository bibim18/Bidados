import { status } from '../../configs/status'

const nextStatus = {
  TODO: 'DONE',
  DONE: 'FAIL',
  FAIL: 'TODO'
}
export const flexMsg = (story, list) => {
  const contents = list.map((item, index) => {
    return {
      type: 'box',
      layout: 'baseline',
      flex: 5,
      action: {
        type: 'postback',
        label: 'changestatus',
        data: `?status=${nextStatus[item.status]}&id=${item.id}&title=${item.title}`
      },
      contents: [
        {
          type: 'text',
          text: `${index + 1}. ${item.title}`,
          align: 'start'
        },
        {
          type: 'icon',
          url: status[item.status]
        }
      ]
    }
  })
  const msg = {
    type: 'flex',
    altText: 'Flex Message',
    contents: {
      type: 'bubble',
      direction: 'ltr',
      header: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: 'List of Memory',
            flex: 2,
            size: 'lg',
            align: 'center',
            weight: 'bold',
            color: '#0990DD'
          }
        ]
      },
      body: {
        type: 'box',
        layout: 'vertical',
        flex: 0,
        contents
      }
    }
  }
  return msg
}
