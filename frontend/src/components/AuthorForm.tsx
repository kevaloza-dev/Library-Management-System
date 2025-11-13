"use client"

import type React from "react"

import { useState } from "react"
import { authorsApi } from "../services/api"
import type { Author } from "../types"

interface AuthorFormProps {
  author?: Author
  onSave: () => void
}

export const AuthorForm = ({ author, onSave }: AuthorFormProps) => {
  const [name, setName] = useState(author?.name || "")
  const [bio, setBio] = useState(author?.bio || "")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (author) {
        await authorsApi.update(author.id, { name, bio })
      } else {
        await authorsApi.create({ name, bio })
      }
      onSave()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save author")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border border-gray-700">
      <h3 className="text-lg font-bold text-white mb-4">{author ? "Edit Author" : "Add New Author"}</h3>

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-4">{error}</div>
      )}

      <div className="space-y-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            rows={4}
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200"
      >
        {loading ? "Saving..." : "Save Author"}
      </button>
    </form>
  )
}
