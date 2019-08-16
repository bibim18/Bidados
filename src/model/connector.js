import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCl-vraUsG_S5ywutJpc6VxJgEdw2jWLEs",
    authDomain: "bidodos-43e72.firebaseapp.com",
    databaseURL: "https://bidodos-43e72.firebaseio.com",
    projectId: "bidodos-43e72",
    storageBucket: "bidodos-43e72.appspot.com",
    messagingSenderId: "949393359805",
    appId: "1:949393359805:web:3c1963c34af53cf6"
  }

  

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();

export default db