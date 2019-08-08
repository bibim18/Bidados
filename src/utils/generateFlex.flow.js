export const flexMsg = (story, list) => {
  const contents = list.map(item => {
    return {
      type: 'text',
      text: item.title,
      align: 'center'
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
            text: `List of ${story.charAt(0).toUpperCase() + story.slice(1)}`,
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
        contents
      }
    }
  }
  return msg
}
