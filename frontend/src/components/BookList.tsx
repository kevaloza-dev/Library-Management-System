"use client"

import { useState, useEffect } from "react"
import { booksApi } from "../services/api"
import type { Book } from "../types"
import { BookForm } from "./BookForm"
import { BookCard } from "./BookCard"

export const BookList = () => {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingBook, setEditingBook] = useState<Book | null>(null)

  const fetchBooks = async () => {
    try {
      setLoading(true)
      const response = await booksApi.getAll()
      setBooks(response.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch books")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  const handleSave = async () => {
    setShowForm(false)
    setEditingBook(null)
    fetchBooks()
  }

  const handleEdit = (book: Book) => {
    setEditingBook(book)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await booksApi.delete(id)
      fetchBooks()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete book")
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Books</h2>
        <button
          onClick={() => {
            setEditingBook(null)
            setShowForm(true)
          }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
        >
          Add Book
        </button>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-4">{error}</div>
      )}

      {showForm && <BookForm book={editingBook || undefined} onSave={handleSave} />}

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-400">Loading books...</p>
        </div>
      ) : books.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400">No books found. Create one to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  )
}
