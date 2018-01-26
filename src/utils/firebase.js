import Firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyBgCE8kQs7-XqbcWaHfOwcVH8bV3ExJink',
  authDomain: 'my-awesome-team.firebaseapp.com',
  databaseURL: 'https://my-awesome-team.firebaseio.com',
  projectId: 'my-awesome-team',
  storageBucket: 'my-awesome-team.appspot.com',
  messagingSenderId: '671775483095'
}

const firebaseApp = Firebase.initializeApp(config)

export const database = firebaseApp.database()
export const auth = firebaseApp.auth()
export const storage = firebaseApp.storage()
