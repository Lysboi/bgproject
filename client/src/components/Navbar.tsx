import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { logout } from '../store/authSlice'

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-dark-900/40 backdrop-blur-xl border-b border-white/5"></div>
      
      <div className="container mx-auto px-6 h-20">
        <div className="relative flex items-center justify-between h-full">
          {/* Logo */}
          <Link to="/" className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg opacity-0 blur-lg group-hover:opacity-70 transition duration-500"></div>
            <span className="relative text-2xl font-black tracking-tight bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">
              BoredGap
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/explore" className="text-white/70 hover:text-white transition-colors">
              Keşfet
            </Link>
            <Link to="/features" className="text-white/70 hover:text-white transition-colors">
              Özellikler
            </Link>
            <Link to="/about" className="text-white/70 hover:text-white transition-colors">
              Hakkında
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="glass-panel py-2 px-4 flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full animate-pulse-slow"></div>
                    <div className="relative w-8 h-8 rounded-full bg-dark-800 border-2 border-white/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-white">
                        {user.username[0].toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-white">
                    {user.username}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="glass-button"
                >
                  Çıkış Yap
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-secondary">
                  Giriş Yap
                </Link>
                <Link to="/register" className="btn-primary">
                  <span>Kayıt Ol</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 