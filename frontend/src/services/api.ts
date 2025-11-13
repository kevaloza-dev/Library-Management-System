import axios, { type AxiosInstance } from "axios"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth API
export const authApi = {
  login: (email: string, password: string) => apiClient.post("/api/auth/login", { email, password }),
  register: (email: string, name: string, password: string) =>
    apiClient.post("/api/auth/register", { email, name, password }),
}

// Books API
export const booksApi = {
  getAll: () => apiClient.get("/api/books"),
  getOne: (id: string) => apiClient.get(`/api/books/${id}`),
  search: (query: string) => apiClient.get(`/api/books/search?query=${query}`),
  create: (data: any) => apiClient.post("/api/books", data),
  update: (id: string, data: any) => apiClient.patch(`/api/books/${id}`, data),
  delete: (id: string) => apiClient.delete(`/api/books/${id}`),
}

// Authors API
export const authorsApi = {
  getAll: () => apiClient.get("/api/authors"),
  getOne: (id: string) => apiClient.get(`/api/authors/${id}`),
  create: (data: any) => apiClient.post("/api/authors", data),
  update: (id: string, data: any) => apiClient.patch(`/api/authors/${id}`, data),
  delete: (id: string) => apiClient.delete(`/api/authors/${id}`),
}

// Users API
export const usersApi = {
  getAll: () => apiClient.get("/api/users"),
  getOne: (id: string) => apiClient.get(`/api/users/${id}`),
  update: (id: string, data: any) => apiClient.patch(`/api/users/${id}`, data),
  delete: (id: string) => apiClient.delete(`/api/users/${id}`),
}

// Borrow Records API
export const borrowRecordsApi = {
  getAll: () => apiClient.get("/api/borrow-records"),
  getOne: (id: string) => apiClient.get(`/api/borrow-records/${id}`),
  getByUser: (userId: string) => apiClient.get(`/api/borrow-records/user/${userId}`),
  create: (data: any) => apiClient.post("/api/borrow-records", data),
  returnBook: (id: string) => apiClient.post(`/api/borrow-records/${id}/return`),
  update: (id: string, data: any) => apiClient.patch(`/api/borrow-records/${id}`, data),
  delete: (id: string) => apiClient.delete(`/api/borrow-records/${id}`),
}
