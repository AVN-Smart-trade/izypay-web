import {
    Bell,
    ChevronRight,
    LogOut,
    Menu,
    Search,
    Sparkles,
    User
} from 'lucide-react';
import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';

interface DashboardLayoutProps {
  children: ReactNode;
  userType: 'customer' | 'vendor' | 'agent' | 'admin' | 'government';
  navigation: Array<{ label: string; path: string; icon: any }>;
  userName?: string;
  userPhone?: string;
}

const userTypeConfig = {
  customer: { label: 'Customer Portal', accent: '#0F6F5C', badge: 'Customer' },
  vendor:   { label: 'Vendor Portal',   accent: '#C7A246', badge: 'Vendor' },
  agent:    { label: 'Agent Portal',    accent: '#12B76A', badge: 'Field Agent' },
  admin:    { label: 'Admin Portal',    accent: '#0F6F5C', badge: 'Administrator' },
  government: { label: 'Government Portal', accent: '#0F6F5C', badge: 'Gov. Observer' },
};

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

export default function DashboardLayout({ 
  children, 
  userType, 
  navigation,
  userName = "Tendai Moyo",
  userPhone = "+263 77 123 4567"
}: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const cfg = userTypeConfig[userType];

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#f5f6fa] flex">
      {/* â”€â”€ SIDEBAR â”€â”€ */}
      <aside
        className={`fixed left-0 top-0 h-full z-40 flex flex-col transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'}`}
        style={{ background: 'linear-gradient(180deg, #0a2e26 0%, #0d3d30 60%, #0a2e26 100%)' }}
      >
        {/* Brand */}
        <div className="px-5 py-5 border-b border-white/10 flex-shrink-0">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #0F6F5C, #12B76A)' }}>
              <span className="text-white font-black text-sm">AVN</span>
            </div>
            <div className="min-w-0">
              <h1 className="font-black text-white text-base leading-none">AVN SmartTrade</h1>
              <p className="text-[11px] font-medium mt-0.5" style={{ color: cfg.accent }}>{cfg.label}</p>
            </div>
          </Link>
        </div>

        {/* Nav badge */}
        <div className="px-5 pt-4 pb-2 flex-shrink-0">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full"
            style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}>
            <Sparkles className="w-2.5 h-2.5" /> {cfg.badge}
          </span>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5 scrollbar-thin">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 group ${
                  isActive
                    ? 'text-white shadow-lg'
                    : 'text-white/50 hover:text-white hover:bg-white/8'
                }`}
                  style={isActive ? { background: `linear-gradient(135deg, ${cfg.accent}cc, ${cfg.accent}88)` } : {}}>
                  <Icon className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : ''}`} />
                  <span className="text-sm font-medium flex-1 truncate">{item.label}</span>
                  {isActive && <ChevronRight className="w-3 h-3 opacity-70 flex-shrink-0" />}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* User footer */}
        <div className="px-4 py-4 border-t border-white/10 flex-shrink-0"
          style={{ background: 'rgba(0,0,0,0.2)' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-sm text-white"
              style={{ background: `linear-gradient(135deg, ${cfg.accent}, ${cfg.accent}99)` }}>
              {getInitials(userName)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white text-sm truncate">{userName}</p>
              <p className="text-[11px] truncate" style={{ color: 'rgba(255,255,255,0.45)' }}>{userPhone}</p>
            </div>
          </div>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-white/10 text-white/50 hover:text-white">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* â”€â”€ MAIN â”€â”€ */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
                <Menu className="w-5 h-5" />
              </button>

              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="search"
                  placeholder="Search transactions, vendors, products..."
                  className="w-80 pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                  style={{ '--tw-ring-color': cfg.accent } as React.CSSProperties}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: '#D92D20' }} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 rounded-2xl shadow-2xl border-gray-100 p-0">
                  <div className="px-5 py-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-gray-900">Notifications</h4>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ background: cfg.accent }}>3 new</span>
                    </div>
                  </div>
                  <div className="p-3 space-y-1">
                    {[
                      { title: 'Payment received', desc: '$25.50 from Tendai Moyo', time: '2m ago', dot: cfg.accent },
                      { title: 'New order placed', desc: 'Order #ORD-001235 pending', time: '1h ago', dot: '#C7A246' },
                      { title: 'KYC approved', desc: 'Your identity was verified', time: '3h ago', dot: '#12B76A' },
                    ].map((n, i) => (
                      <div key={i} className="flex gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                        <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: n.dot }} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900">{n.title}</p>
                          <p className="text-xs text-gray-400">{n.desc}</p>
                        </div>
                        <span className="text-[10px] text-gray-400 flex-shrink-0 mt-0.5">{n.time}</span>
                      </div>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${cfg.accent}, ${cfg.accent}99)` }}>
                      {getInitials(userName)}
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-semibold text-gray-900 leading-none">{userName.split(' ')[0]}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5 capitalize">{cfg.badge}</p>
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-2xl shadow-2xl border-gray-100">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="font-bold text-gray-900">{userName}</p>
                    <p className="text-xs text-gray-400">{userPhone}</p>
                  </div>
                  <div className="p-1.5">
                    <DropdownMenuItem className="rounded-xl cursor-pointer">Profile Settings</DropdownMenuItem>
                    <DropdownMenuItem className="rounded-xl cursor-pointer">Security</DropdownMenuItem>
                    <DropdownMenuItem className="rounded-xl cursor-pointer">Help & Support</DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator />
                  <div className="p-1.5">
                    <DropdownMenuItem onClick={handleLogout} className="rounded-xl cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-50">
                      <LogOut className="w-4 h-4 mr-2" /> Sign Out
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
