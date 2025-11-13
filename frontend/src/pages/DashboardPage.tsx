"use client"

import { useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { BookList } from "../components/BookList"
import { AuthorList } from "../components/AuthorList"
import { BorrowHistory } from "../components/BorrowHistory"

type Tab = "books" | "authors" | "borrowed"

export const Dashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<Tab>("books")

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate])

  return (
    <div>
      {/* Main Content */}
      <main>
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 border-b border-gray-700">
          <button
            onClick={() => setActiveTab("books")}
            className={`px-4 py-2 font-medium border-b-2 transition-colors duration-200 ${
              activeTab === "books"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-gray-400 hover:text-gray-200"
            }`}
          >
            Books
          </button>
          <button
            onClick={() => setActiveTab("authors")}
            className={`px-4 py-2 font-medium border-b-2 transition-colors duration-200 ${
              activeTab === "authors"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-gray-400 hover:text-gray-200"
            }`}
          >
            Authors
          </button>
          <button
            onClick={() => setActiveTab("borrowed")}
            className={`px-4 py-2 font-medium border-b-2 transition-colors duration-200 ${
              activeTab === "borrowed"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-gray-400 hover:text-gray-200"
            }`}
          >
            Borrow History
          </button>
        </div>

        {/* Content */}
        {activeTab === "books" && <BookList />}
        {activeTab === "authors" && <AuthorList />}
        {activeTab === "borrowed" && <BorrowHistory />}
      </main>
    </div>
  )
}
