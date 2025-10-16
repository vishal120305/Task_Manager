import { useState, useRef, useEffect } from "react"
import { Settings, ChevronDown, LogOut, Zap } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Navbar = ({ user = {}, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const menuRef = useRef(null)

  const handleMenuToggle = () => setMenuOpen((prev) => !prev)
  const handleLogout = () => {
    setMenuOpen(false)
    onLogout()
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200 font-sans">
      <div className="flex items-center justify-between px-4 py-3 md:px-6 max-w-7xl mx-auto">
        {/* Left - Logo + Brand */}
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate("/")}>
          {/* GenZ Logo */}
          <div className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500 shadow-lg group-hover:shadow-purple-300/50 group-hover:scale-105 transition-all duration-300">
            <Zap className="w-6 h-6 text-white" />
            <div className="absolute -bottom-1 -middle-1 w-3 h-3 bg-white rounded-full shadow-md animate-ping" />
          </div>

          {/* Stylish Brand Name */}
          <span className="text-2xl font-extrabold bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent tracking-wide">
            TaskFlow
          </span>
        </div>

        {/* Right - User Controls */}
        <div className="flex items-center gap-4">
          <button
            className="p-2 text-gray-600 hover:text-purple-500 transition-colors duration-300 hover:bg-purple-50 rounded-full"
            onClick={() => navigate("/profile")}
            aria-label="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* User Dropdown */}
          <div ref={menuRef} className="relative">
            <button
              onClick={handleMenuToggle}
              className="flex items-center gap-2 px-3 py-2 rounded-full cursor-pointer hover:bg-purple-50 transition-colors duration-300 border border-transparent hover:border-purple-200"
            >
              <div className="relative">
                {user.avatar ? (
                  <img
                    src={user.avatar || "/placeholder.svg"}
                    alt="Avatar"
                    className="w-9 h-9 rounded-full bg-gradient-to-br shadow-sm"
                  />
                ) : (
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white font-semibold shadow-md">
                    {user.name?.[0]?.toUpperCase() || "U"}
                  </div>
                )}
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
              </div>

              <div className="text-left hidden md:block">
                <p className="text-sm font-medium text-gray-800">{user.name || "Guest User"}</p>
                <p className="text-xs text-gray-500 font-normal">{user.email || "user@taskflow.com"}</p>
              </div>

              <ChevronDown
                className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${menuOpen ? "rotate-180" : ""}`}
              />
            </button>

            {menuOpen && (
              <ul className="absolute top-14 right-0 w-56 bg-white rounded-2xl shadow-xl border border-purple-100 z-50 overflow-hidden animate-fadeIn">
                <li className="p-2">
                  <button
                    onClick={() => {
                      setMenuOpen(false)
                      navigate("/profile")
                    }}
                    className="w-full px-4 py-2.5 text-left hover:bg-purple-50 text-sm text-gray-700 transition-colors flex items-center gap-2 group"
                    role="menuitem"
                  >
                    <Settings className="w-4 h-4 text-gray-700" />
                    Profile Settings
                  </button>
                </li>
                <li className="p-2">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-red-50 text-red-600"
                    role="menuitem"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar