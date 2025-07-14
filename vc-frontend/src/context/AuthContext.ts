import { createContext } from "react"
import type { AuthContextType } from "./context"


const AuthContext = createContext<AuthContextType | null>(null)

export default AuthContext