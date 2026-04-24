import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { api } from '../../../services/api';
import { 
  LayoutDashboard, 
  UserPlus, 
  Beaker, 
  FileText, 
  Users, 
  Building2,
  Stethoscope,
  LogOut,
  User,
  Search,
  ClipboardList,
  Upload,
  AlertCircle,
  Settings,
  Menu,
  PanelLeftClose,
  PanelLeft
} from 'lucide-react';
import { Button } from '../ui/button';

export function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState<{nome: string, perfil: string} | null>(null);

  useEffect(() => {
    api.get('/auth/session')
      .then(res => setUser(res.data.user))
      .catch(() => navigate('/login'));
  }, [navigate]);

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/logout');
    } finally {
      navigate('/login');
    }
  };

  // Sidebar visibility and resize logic
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(256); // 256px = 16rem
  const [isResizing, setIsResizing] = useState(false);

  const startResizing = useCallback((e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
  }, []);

  const resize = useCallback((e: MouseEvent) => {
    if (isResizing) {
      const newWidth = e.clientX;
      if (newWidth >= 180 && newWidth <= 450) {
        setSidebarWidth(newWidth);
      }
      // Se arrastar quase até o fim (menos que 100px), recolhe a sidebar
      if (newWidth < 100) {
        setIsSidebarVisible(false);
        setIsResizing(false);
      }
    }
  }, [isResizing]);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (isResizing) {
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none'; // Prevent text selection while dragging
    } else {
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    }
    
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);

    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [isResizing, resize, stopResizing]);

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Painel' },
    { path: '/patient-search', icon: Search, label: 'Buscar Paciente' },
    { path: '/register-patient', icon: UserPlus, label: 'Registrar RN' },
    { path: '/sample-collection', icon: ClipboardList, label: 'Coleta de Amostra' },
    { path: '/triage', icon: Beaker, label: 'Triagem' },
    { path: '/file-import', icon: Upload, label: 'Importar Arquivos' },
    { path: '/lab-results', icon: FileText, label: 'Resultados Laboratoriais' },
    { path: '/medical-reports', icon: FileText, label: 'Laudos Médicos' },
    { path: '/operational-reports', icon: FileText, label: 'Relatórios' },
    { path: '/delayed-samples', icon: AlertCircle, label: 'Amostras Atrasadas' },
    { path: '/users', icon: Users, label: 'Usuários' },
    { path: '/collection-units', icon: Building2, label: 'Postos de Coleta' },
    { path: '/exams-manager', icon: Stethoscope, label: 'Gerenciador de Exames' },
  ];

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`bg-sidebar border-sidebar-border flex flex-col text-sidebar-foreground relative shrink-0 overflow-hidden ${
          isSidebarVisible ? 'border-r opacity-100 visible' : 'border-none opacity-0 invisible'
        }`}
        style={{ 
          width: isSidebarVisible ? `${sidebarWidth}px` : '0px', 
          transition: isResizing ? 'none' : 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s allow-discrete' 
        }}
      >
        {/* Resize Handle Drag Area */}
        <div 
          onMouseDown={startResizing}
          className="absolute top-0 right-0 w-1.5 h-full cursor-col-resize bg-transparent hover:bg-primary/40 active:bg-primary z-50 transition-colors"
        />

        <div className="p-6 border-b border-sidebar-border overflow-hidden whitespace-nowrap text-ellipsis min-w-[180px]">
          <h1 className="text-xl font-bold truncate">SISTNN – Sistema de Triagem Neonatal</h1>
          <p className="text-sm opacity-75 mt-1 truncate">Sistema de Triagem</p>
        </div>

        <nav className="flex-1 overflow-y-auto overflow-x-hidden p-4 min-w-[180px]">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors overflow-hidden whitespace-nowrap ${
                    isActive
                       ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                      : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span className="text-sm truncate">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-sidebar-border overflow-hidden whitespace-nowrap min-w-[180px]">
          <Link
            to="/settings"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          >
            <Settings className="w-5 h-5 shrink-0" />
            <span className="text-sm truncate">Configurações</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        {/* Header */}
        <header className="bg-sidebar border-b border-sidebar-border px-4 md:px-6 py-4 text-sidebar-foreground shrink-0 overflow-x-auto">
          <div className="flex items-center justify-between min-w-max md:min-w-0 gap-4">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSidebarVisible(!isSidebarVisible)}
                className="text-sidebar-foreground/80 hover:text-sidebar-accent-foreground hover:bg-sidebar-accent shrink-0"
                title={isSidebarVisible ? "Ocultar Menu Lateral" : "Mostrar Menu Lateral"}
              >
                {isSidebarVisible ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeft className="w-5 h-5" />}
              </Button>
              <div className="truncate">
                <h2 className="text-lg font-semibold truncate">
                  {navItems.find(item => item.path === location.pathname)?.label || 'Painel'}
                </h2>
                <p className="text-sm opacity-75 truncate md:block hidden">
                  {new Date().toLocaleDateString('pt-BR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-sidebar-accent-foreground" />
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium">{user ? user.nome : 'Carregando...'}</p>
                  <p className="text-xs opacity-75">{user ? user.perfil : ''}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleLogout} 
                className="text-sidebar-foreground/80 hover:text-sidebar-accent-foreground hover:bg-sidebar-accent shrink-0"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-3 md:p-6 bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
