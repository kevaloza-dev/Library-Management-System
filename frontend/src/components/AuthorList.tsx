"use client"

import { useState, useEffect } from "react"
import { authorsApi } from "../services/api"
import type { Author } from "../types"
import { AuthorForm } from "./AuthorForm"

export const AuthorList = () => {
  const [authors, setAuthors] = useState<Author[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null)

  const fetchAuthors = async () => {
    try {
      setLoading(true)
      const response = await authorsApi.getAll()
      setAuthors(response.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch authors")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAuthors()
  }, [])

  const handleSave = async () => {
    setShowForm(false)
    setEditingAuthor(null)
    fetchAuthors()
  }

  const handleDelete = async (id: string) => {
    try {
      await authorsApi.delete(id)
      fetchAuthors()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete author")
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Authors</h2>
        <button
          onClick={() => {
            setEditingAuthor(null)
            setShowForm(true)
          }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
        >
          Add Author
        </button>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-4">{error}</div>
      )}

      {showForm && <AuthorForm author={editingAuthor || undefined} onSave={handleSave} />}

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-400">Loading authors...</p>
        </div>
      ) : authors.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400">No authors found.</p>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg shadow-md border border-gray-700 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-700 border-b border-gray-600">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {authors.map((author) => (
                <tr key={author.id} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="px-6 py-4 text-sm text-gray-300">{author.name}</td>
                  <td className="px-6 py-4 text-sm flex gap-2">
                    <button
                      onClick={() => {
                        setEditingAuthor(author)
                        setShowForm(true)
                      }}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(author.id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-sm transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
