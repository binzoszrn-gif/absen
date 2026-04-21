import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  UserCheck, 
  Users, 
  FileText, 
  Settings, 
  LogOut, 
  Menu,
  X,
  GraduationCap,
  PanelLeftClose
} from 'lucide-react';
import { useState } from 'react';
import { UserProfile } from '../types';

interface AppLayoutProps {
  user: UserProfile;
  onLogout: () => void;
}

export default function AppLayout({ user, onLogout }: AppLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/app', icon: Home, roles: ['admin', 'guru', 'staf'] },
    { name: 'Absensi Karyawan', path: '/app/absensi-karyawan', icon: UserCheck, roles: ['admin', 'guru', 'staf'] },
    { name: 'Absensi Siswa', path: '/app/absensi-siswa', icon: GraduationCap, roles: ['admin', 'guru'] },
    { name: 'Rekap Absensi', path: '/app/rekap', icon: FileText, roles: ['admin', 'guru'] },
    { name: 'Data Siswa', path: '/app/data-siswa', icon: Users, roles: ['admin'] },
    { name: 'User Management', path: '/app/users', icon: Settings, roles: ['admin'] },
  ];

  const filteredMenu = menuItems.filter(item => item.roles.includes(user.role));

  return (
    <div className="flex h-screen bg-[#F7F8FA] font-sans text-gray-800">
      {/* Sidebar */}
      <aside 
        className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 z-40 fixed lg:static h-full ${
          isSidebarOpen ? 'w-64' : 'w-20'
        } ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between overflow-hidden">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 bg-primary rounded-lg flex shrink-0 items-center justify-center text-white font-bold text-xl transition-all">
                {isSidebarOpen ? user.role.charAt(0).toUpperCase() : user.role.charAt(0).toUpperCase()}
              </div>
              {isSidebarOpen && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }}
                  className="overflow-hidden"
                >
                  <h1 className="text-sm font-bold leading-tight uppercase tracking-wider text-primary truncate">SMK Prima</h1>
                  <p className="text-[10px] text-gray-400 font-medium tracking-widest truncate">UNGGUL SYSTEM</p>
                </motion.div>
              )}
            </div>
            
            {isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="p-1.5 hover:bg-primary-light text-gray-400 hover:text-primary rounded-lg transition-colors flex shrink-0"
                title="Tutup Menu"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
            {isSidebarOpen && (
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">
                Menu {user.role}
              </div>
            )}
            {filteredMenu.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group relative ${
                    isActive 
                      ? 'bg-primary-light text-primary font-semibold shadow-sm' 
                      : 'text-gray-500 hover:bg-gray-50 font-medium'
                  }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? 'bg-primary' : 'bg-gray-300'}`}></div>
                  {isSidebarOpen && <span className="text-sm">{item.name}</span>}
                  
                  {!isSidebarOpen && (
                    <div className="absolute left-full ml-4 px-2 py-1 bg-gray-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                      {item.name}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Badge at Bottom */}
          <div className="p-4 border-t border-gray-100">
            {isSidebarOpen ? (
              <div className="bg-primary-light p-4 rounded-xl">
                <p className="text-[11px] font-bold text-primary uppercase mb-1 truncate tracking-tight">{user.role.toUpperCase()} ROLE</p>
                <p className="text-[11px] text-primary/70 truncate">Logged in as: {user.name}</p>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="w-10 h-10 bg-primary-light rounded-xl flex items-center justify-center text-primary font-bold text-xs">
                  {user.name.charAt(0)}
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full min-w-0">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-200 px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-50 rounded-lg text-gray-400"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-baseline gap-2 overflow-hidden">
              <h2 className="text-xl font-bold text-gray-900 truncate">
                {menuItems.find(item => item.path === location.pathname)?.name || 'Dashboard'}
              </h2>
              <span className="text-sm text-gray-400 hidden sm:inline whitespace-nowrap">
                | {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>
          </div>
          <button 
            onClick={() => {
              onLogout();
              navigate('/');
            }}
            className="px-5 py-2.5 bg-white border border-primary-light text-primary rounded-lg font-bold text-sm hover:bg-primary-light transition-all shadow-sm flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Keluar Aplikasi</span>
          </button>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 bg-[#F7F8FA]">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
