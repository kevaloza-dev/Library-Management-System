"use client"

import type React from "react"
import { createContext, useState, useEffect, type ReactNode } from "react"
import type { User } from "../types"
import { authApi } from "../services/api"

interface AuthContextType {
  user: User | null
  token: string | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, name: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load token and user from localStorage on mount
    const storedToken = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login(email, password)
      const { access_token, user: userData } = response.data

      setToken(access_token)
      setUser(userData)

      localStorage.setItem("token", access_token)
      localStorage.setItem("user", JSON.stringify(userData))
    } catch (error) {
      throw error
    }
  }

  const register = async (email: string, name: string, password: string) => {
    try {
      const response = await authApi.register(email, name, password)
      const { access_token, user: userData } = response.data

      setToken(access_token)
      setUser(userData)

      localStorage.setItem("token", access_token)
      localStorage.setItem("user", JSON.stringify(userData))
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }

  const isAuthenticated = !!token && !!user

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
