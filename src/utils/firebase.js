import Firebase from 'firebase'
import { firebaseConfig } from '../config'

const firebaseApp = Firebase.initializeApp(firebaseConfig)

export default firebaseApp
