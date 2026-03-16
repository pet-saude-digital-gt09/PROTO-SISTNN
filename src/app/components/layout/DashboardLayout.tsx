import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserPlus, 
  Beaker, 
  FileText, 
  Users, 
  Building2,
  LogOut,
  User,
  Search,
  ClipboardList,
  Upload,
  AlertCircle,
  Settings
} from 'lucide-react';
import { Button } from '../ui/button';

export function DashboardLayout() {
  const location = useLocation();

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
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-blue-600">SISTNN – Sistema de Triagem Neonatal</h1>
          <p className="text-sm text-gray-500 mt-1">Sistema de Triagem</p>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Link
            to="/settings"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span className="text-sm">Configurações</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {navItems.find(item => item.path === location.pathname)?.label || 'Painel'}
              </h2>
              <p className="text-sm text-gray-500">
                {new Date().toLocaleDateString('pt-BR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">Dr. Carlos Mendes</p>
                  <p className="text-xs text-gray-500">Gerente do Laboratório</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/login">
                  <LogOut className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
