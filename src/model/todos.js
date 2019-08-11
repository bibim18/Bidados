import db from './connector'

export default {
    getAll: async filter => {
      let snapshot = await db.collection('todos').get()
      if(filter) snapshot = await db.collection('todos').where('story','==', filter).get()
        let dataList = []
        snapshot.forEach((doc) => {
          dataList = [...dataList , { id:doc.id, ...doc.data() } ]
        });
        return dataList
    },
    create: async todo => {
      return await db.collection('todos').add(todo)
    },
    update: async (id, status) => {
      return await db.collection('todos').doc(id).update({status})
    }
}