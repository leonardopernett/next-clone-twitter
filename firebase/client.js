import * as firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyDSLjDcA6IfXh7o9xLaSYNT6XH08euolP8",
    authDomain: "react-f137b.firebaseapp.com",
    projectId: "react-f137b",
    storageBucket: "react-f137b.appspot.com",
    messagingSenderId: "1087052118047",
    appId: "1:1087052118047:web:c80e68ce39b19a1c3bbd2a",
    databaseURL:`https://react-f137b.firebaseio.com`
}
 

!firebase.apps.length && firebase.initializeApp(firebaseConfig)//verify 
const db = firebase.firestore();


const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL,uid } = user
  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid
  }
}
export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null
    onChange(normalizedUser)
  })
}

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase.auth().signInWithPopup(githubProvider)
}


export const addDevit = ({avatar ,uid, message, username})=>{
  return db.collection('devits')
  .add({avatar,
      uid,
      message,
      username,
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      likeCount:0,
      sharedCount:0
    })
}

export const fetchDevit = ()=>{
  return db.collection('devits')
     .get()
     .then(snapShot=>{
         return snapShot.docs.map(doc=>{
             const data = doc.data()
             
             return {
               ...data,
               id:doc.id,
  
             }
         })
     })
}

export const uploadImage = (file)=>{
  const ref = firebase.storage().ref(`images/${file.image}`)
  const task = ref.put(file)
  return task
}