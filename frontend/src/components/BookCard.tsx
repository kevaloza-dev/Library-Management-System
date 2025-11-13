"use client"

import type { Book } from "../types"

interface BookCardProps {
  book: Book
  onEdit: (book: Book) => void
  onDelete: (id: string) => void
}

export const BookCard = ({ book, onEdit, onDelete }: BookCardProps) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700 hover:shadow-xl transition-shadow duration-200">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white mb-1">{book.title}</h3>
        <p className="text-sm text-gray-400">by {book.author.name}</p>
      </div>

      <div className="space-y-2 mb-4 text-sm">
        <p className="text-gray-300">
          <span className="font-semibold text-white">ISBN:</span> {book.isbn}
        </p>
        <p className="text-gray-300">
          <span className="font-semibold text-white">Published:</span> {book.publishYear}
        </p>
        <p className="text-gray-300">
          <span className="font-semibold text-white">Available:</span>{" "}
          <span className={book.availableCopies > 0 ? "text-green-400" : "text-red-400"}>
            {book.availableCopies} of {book.copies}
          </span>
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(book)}
          className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors duration-200"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(book.id)}
          className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-sm transition-colors duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
