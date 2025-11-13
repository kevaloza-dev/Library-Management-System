"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { booksApi, authorsApi } from "../services/api"
import type { Book, Author } from "../types"

interface BookFormProps {
  book?: Book
  onSave: () => void
}

export const BookForm = ({ book, onSave }: BookFormProps) => {
  const [title, setTitle] = useState(book?.title || "")
  const [isbn, setIsbn] = useState(book?.isbn || "")
  const [publishYear, setPublishYear] = useState(book?.publishYear || new Date().getFullYear())
  const [copies, setCopies] = useState(book?.copies || 1)
  const [authorId, setAuthorId] = useState(book?.authorId || "")
  const [authors, setAuthors] = useState<Author[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await authorsApi.getAll()
        setAuthors(response.data)
      } catch (err) {
        console.error("Failed to fetch authors:", err)
      }
    }
    fetchAuthors()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const bookData = {
      title,
      isbn,
      publishYear,
      copies,
      authorId,
    }

    try {
      if (book) {
        await booksApi.update(book.id, bookData)
      } else {
        await booksApi.create(bookData)
      }
      onSave()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save book")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border border-gray-700">
      <h3 className="text-lg font-bold text-white mb-4">{book ? "Edit Book" : "Add New Book"}</h3>

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-4">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">ISBN</label>
          <input
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Published Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(Number.parseInt(e.target.value))}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Total Copies</label>
          <input
            type="number"
            value={copies}
            onChange={(e) => setCopies(Number.parseInt(e.target.value))}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required
            min="1"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">Author</label>
          <select
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required
          >
            <option value="">Select an author</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200"
        >
          {loading ? "Saving..." : "Save Book"}
        </button>
      </div>
    </form>
  )
}
