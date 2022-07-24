import { signOut, signInWithEmailAndPassword, onAuthStateChanged } from "@firebase/auth"
import { defineStore } from "pinia"
import { auth } from "../firebase"
import { useRouter } from "vue-router"

const router = useRouter()
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
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user.id = user.uid
          this.user.email = user.email
          this.user.name = user.displayName
        } else {
          this.user = <any>{}
        }
      })
    },

    async LoginUser(credentials: SignUpUserObject) {
      await signInWithEmailAndPassword(auth, credentials.email, credentials.password)
    },
    async LogOut() {
      await signOut(auth)
      router.replace("/auth")
    },
  },
})
