import type React from "react"
import { createContext, useState, useEffect, useContext } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useAuth } from "./AuthContext"

interface User {
  id: string
  username: string
  email: string
  age: number
  hobbies: string[]
}

interface UserContextType {
  users: User[]
  loading: boolean
  error: string | null
  fetchUsers: () => Promise<void>
  createUser: (user: Omit<User, "id">) => Promise<void>
  updateUser: (id: string, user: Omit<User, "id">) => Promise<void>
  deleteUser: (id: string) => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  const api = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.token}`,
    },
  })

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const response = await api.get("/users")
      setUsers(response.data)
    } catch (err) {
      setError("Error fetching users")
      toast.error("Error fetching users")
    } finally {
      setLoading(false)
    }
  }

  const createUser = async (userData: Omit<User, "id">) => {
    try {
      const response = await api.post("/users", userData)
      setUsers([...users, response.data])
      toast.success("User created successfully")
    } catch (err) {
      toast.error("Error creating user")
    }
  }


const updateUser = async (id: string, userData: Omit<User, "id">) => {
    try {
      const response = await api.put(`/users/${id}`, userData)
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === id ? { ...u, ...response.data } : u))
      )
      toast.success("User updated successfully")
    } catch (err) {
      console.error("Error updating user:", err)
      toast.error("Error updating user")
    }
  }
  

  const deleteUser = async (id: string) => {
    try {
      await api.delete(`/users/${id}`)
      setUsers(users.filter((u) => u.id !== id))
      toast.success("User deleted successfully")
    } catch (err) {
      toast.error("Error deleting user")
    }
  }

  useEffect(() => {
    if (user) {
      fetchUsers()
    }
  }, [user])

  return (
    <UserContext.Provider value={{ users, loading, error, fetchUsers, createUser, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider")
  }
  return context
}

