import todos from '../../model/todos'


export const createData = async(text) => {
    let story
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
          status: 'TODO',
          story
        }
      }
      await todos.create(data)
      return story
}