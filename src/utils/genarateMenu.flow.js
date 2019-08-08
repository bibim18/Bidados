export const genarateMenu = async stories => {
  const action = stories
    .filter(item => item.story)
    .map(item => {
      return {
        type: 'message',
        label: `List of ${item.story.charAt(0).toUpperCase() + item.story.slice(1)}`,
        text: item.story
      }
    })

    action.push({
      type: 'message',
      label: `List All`,
      text: 'list'
    })
  const flexMsg = {
    type: 'template',
    altText: 'select story list',
    template: {
      type: 'buttons',
      actions: [...new Set(action.map(i => JSON.stringify(i)))].map(s => JSON.parse(s)),
      title: 'Select Story List',
      text: 'เลือกลิสต์ที่ต้องการแสดง'
    }
  }
  return flexMsg
}
