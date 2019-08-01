import db from './connector'

export default {
    getAll: async () => {
        const snapshot = await db.collection('todos').get()
        let dataList = []
        snapshot.forEach((doc) => {
          console.log(doc.id, '=>', doc.data());
          dataList = [...dataList , { id:doc.id, ...doc.data() } ]
        });
        console.log(dataList);
        return dataList
    }
}