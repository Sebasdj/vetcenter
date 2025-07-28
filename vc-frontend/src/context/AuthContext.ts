import { createContext } from "react"
import type { AuthContext as IAuthContext } from "../types/context"


const AuthContext = createContext<IAuthContext>({
  jwt: '',
  user: null,
  login: () => {},
  logout: () => {}
})

export default AuthContext