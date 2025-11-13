"use client"

import { NavLink, useNavigate } from "react-router-dom"
import { Home, Book, Users, Library, ArrowRightLeft, LogOut } from "lucide-react"
import { useAuth } from "../hooks/useAuth"

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/books", label: "Books", icon: Book },
  { href: "/authors", label: "Authors", icon: Users },
  { href: "/users", label: "Users", icon: Library },
  { href: "/borrowed", label: "Borrowed", icon: ArrowRightLeft },
]

export const Sidebar = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <aside className="w-64 flex-shrink-0 bg-slate-800 text-white p-4 flex flex-col">
      <div className="text-2xl font-bold mb-8">LMS</div>
      <nav className="flex flex-col space-y-2 flex-grow">
        {navLinks.map((link) => (
          <NavLink
            key={link.href}
            to={link.href}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-700 hover:text-white"
              }`
            }
          >
            <link.icon className="h-5 w-5" />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
      <button
        onClick={handleLogout}
        className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors text-slate-300 hover:bg-red-700 hover:text-white mt-auto"
      >
        <LogOut className="h-5 w-5" />
        <span>Logout</span>
      </button>
    </aside>
  )
}
