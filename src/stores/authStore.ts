import {
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updatePassword,
  updateEmail,
} from "@firebase/auth"
import { defineStore } from "pinia"
import { auth } from "../firebase"

//
// HANDLES APP AUTHENTICATION ONLY -> ENSURE TO FETCH ANY FIREBASE /
// FIRESTORE DATA IN ONAUTHSTATE CHANGED FUNCTION UNDER INIT
//

export interface SignUpUserObject {
  name: string
  email: string
  password: string
  passwordCheck: string
  promotional: boolean
}

export type AuthenticatedUser = {
  id: string
  name: string | null
  email: string | null
}

export const useAuthStore = defineStore("authStore", {
  state: () => {
    return {
      user: <AuthenticatedUser>{},
    }
  },
  actions: {
    init() {
      // const router = useRouter()
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user.id = user.uid
          this.user.email = user.email
          this.user.name = user.displayName
        } else {
          this.user = <any>{}
          // router.replace("/auth")
        }
      })
    },

    async LoginUser(credentials: SignUpUserObject) {
      await signInWithEmailAndPassword(auth, credentials.email, credentials.password)
    },
    async LogOut() {
      await signOut(auth)
    },
    async changePassword(newPassword: string) {
      if (auth.currentUser) await updatePassword(auth.currentUser, newPassword)
    },
    async changeAccountEmail(newEmail: string) {
      if (auth.currentUser) await updateEmail(auth.currentUser, newEmail)
    },
  },
})
