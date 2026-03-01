import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useState } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <Link to="/" className="flex items-center gap-2 text-xl font-bold hover:text-blue-400 transition-colors">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            ShopSmart
          </Link>


          <ul className="hidden md:flex items-center gap-6">
            <li>
              <Link to="/" className="hover:text-blue-400 transition-colors font-medium">
                Home
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-blue-400 transition-colors font-medium flex items-center gap-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Cart
              </Link>
            </li>

            {!user ? (
              <>
                <li>
                  <Link to="/login" className="hover:text-blue-400 transition-colors font-medium">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-colors">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/profile" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium">{user.name}</span>
                  </Link>
                </li>
                {user.role !== "admin" && (
                  <li>
                    <Link to="/orders" className="hover:text-blue-400 transition-colors font-medium">
                      🧾 My Orders
                    </Link>
                  </li>
                )}


                {user.role === "admin" && (
                  <li className="relative">
                    <button
                      onClick={() => setShowAdminMenu((prev) => !prev)}
                      className="flex items-center gap-1 hover:text-yellow-400 transition-colors font-medium"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Admin
                      <svg className={`w-4 h-4 transition-transform ${showAdminMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {showAdminMenu && (
                      <ul className="absolute right-0 mt-2 bg-white text-gray-800 rounded-lg shadow-xl w-52 py-2 border border-gray-200">
                        <li>
                          <Link to="/admin/dashboard" className="block px-4 py-2 hover:bg-blue-50 transition-colors" onClick={() => setShowAdminMenu(false)}>
                            📊 Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link to="/admin/users" className="block px-4 py-2 hover:bg-blue-50 transition-colors" onClick={() => setShowAdminMenu(false)}>
                            👥 Manage Users
                          </Link>
                        </li>
                        <li>
                          <Link to="/admin/products" className="block px-4 py-2 hover:bg-blue-50 transition-colors" onClick={() => setShowAdminMenu(false)}>
                            📦 Manage Products
                          </Link>
                        </li>
                        <li>
                          <Link to="/admin/orders" className="block px-4 py-2 hover:bg-blue-50 transition-colors" onClick={() => setShowAdminMenu(false)}>
                            🛒 Orders
                          </Link>
                        </li>
                        <li>
                          <Link to="/admin/stats" className="block px-4 py-2 hover:bg-blue-50 transition-colors" onClick={() => setShowAdminMenu(false)}>
                            💰 Revenue / Stats
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                )}

                <li>
                  <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>


          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-700 py-4">
            <ul className="space-y-2">
              <li>
                <Link to="/" className="block px-4 py-2 hover:bg-gray-700 rounded transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/cart" className="block px-4 py-2 hover:bg-gray-700 rounded transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  Cart
                </Link>
              </li>

              {!user ? (
                <>
                  <li>
                    <Link to="/login" className="block px-4 py-2 hover:bg-gray-700 rounded transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-700 rounded transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      Profile ({user.name})
                    </Link>
                  </li>
                  {user.role !== "admin" && (
                    <li>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 hover:bg-gray-700 rounded transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        🧾 My Orders
                      </Link>
                    </li>
                  )}

                  {user.role === "admin" && (
                    <>
                      <li className="px-4 py-2 text-yellow-400 font-semibold text-sm">Admin Panel</li>
                      <li>
                        <Link to="/admin/dashboard" className="block px-4 py-2 hover:bg-gray-700 rounded transition-colors" onClick={() => setMobileMenuOpen(false)}>
                          📊 Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link to="/admin/users" className="block px-4 py-2 hover:bg-gray-700 rounded transition-colors" onClick={() => setMobileMenuOpen(false)}>
                          👥 Manage Users
                        </Link>
                      </li>
                      <li>
                        <Link to="/admin/products" className="block px-4 py-2 hover:bg-gray-700 rounded transition-colors" onClick={() => setMobileMenuOpen(false)}>
                          📦 Manage Products
                        </Link>
                      </li>
                      <li>
                        <Link to="/admin/orders" className="block px-4 py-2 hover:bg-gray-700 rounded transition-colors" onClick={() => setMobileMenuOpen(false)}>
                          🛒 Orders
                        </Link>
                      </li>
                      <li>
                        <Link to="/admin/stats" className="block px-4 py-2 hover:bg-gray-700 rounded transition-colors" onClick={() => setMobileMenuOpen(false)}>
                          💰 Revenue / Stats
                        </Link>
                      </li>
                    </>
                  )}

                  <li>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition-colors">
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;