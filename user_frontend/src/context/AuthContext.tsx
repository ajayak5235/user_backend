import type React from "react"
import { createContext, useState, useEffect, useContext } from "react"
import axios from "axios"
import { toast } from "react-toastify"

interface User {
  id: string
  username: string
  email: string
  age: number
  hobbies: string[]
  token: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string, ) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:3000/api/users/login", { email, password })
      setUser(response.data)
      localStorage.setItem("user", JSON.stringify(response.data))
      toast.success("Logged in successfully")
    } catch (error) {
      toast.error("Invalid email or password")
    }
  }

  const register = async (username: string, email: string, password: string) => {
    console.log(username,email,password)
    try {
      await axios.post("http://localhost:3000/api/users/register", { 
        username, 
        email, 
        password 
      });

      toast.success("Registered successfully");
    } catch (error) {
      toast.error("Registration failed");
    }
  };
  

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    toast.success("Logged out successfully")
  }

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

