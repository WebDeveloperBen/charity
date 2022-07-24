import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD9L16lgEej1cpjE1ox1w_rNdVaTckv75s",
  authDomain: "ashley-charity.firebaseapp.com",
  projectId: "ashley-charity",
  storageBucket: "ashley-charity.appspot.com",
  messagingSenderId: "603689629899",
  appId: "1:603689629899:web:d9419f91e0e34c4eb3434e",
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db, app }
