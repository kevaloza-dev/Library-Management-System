"use client"

import { useState, useEffect } from "react"
import { borrowRecordsApi } from "../services/api"
import type { BorrowRecord } from "../types"

export const BorrowHistory = () => {
  const [records, setRecords] = useState<BorrowRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchRecords = async () => {
    try {
      setLoading(true)
      const response = await borrowRecordsApi.getAll()
      setRecords(response.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch borrow history")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRecords()
  }, [])

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-6">Borrow History</h2>

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-4">{error}</div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-400">Loading history...</p>
        </div>
      ) : records.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400">No borrow records found.</p>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg shadow-md border border-gray-700 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-700 border-b border-gray-600">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">Book</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">User</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">Borrowed</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">Returned</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="px-6 py-4 text-sm text-gray-300">{record.book.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{record.user.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {new Date(record.borrowDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {record.returnDate ? new Date(record.returnDate).toLocaleDateString() : "-"}
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
