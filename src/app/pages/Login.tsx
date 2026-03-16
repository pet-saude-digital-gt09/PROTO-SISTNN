import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { HeartPulse } from 'lucide-react';

export function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Bem-vindo(a) de volta</h1>
            <p className="text-gray-600">Faça login para acessar o SISTNN – Sistema de Triagem Neonatal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Usuário</Label>
              <Input
                id="username"
                type="text"
                placeholder="Insira seu usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Insira sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                <span className="text-sm text-gray-600">Lembrar de mim</span>
              </label>
              <Button 
                variant="link" 
                type="button"
                onClick={() => navigate('/password-recovery')}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Esqueceu a senha?
              </Button>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Entrar
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Acesso seguro apenas para profissionais de saúde
          </p>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-blue-500 to-teal-500 p-8">
        <div className="text-center text-white">
          <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <HeartPulse className="w-16 h-16" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Cuidado Neonatal</h2>
          <p className="text-xl text-blue-100 max-w-md mx-auto">
            Triagem avançada e gestão de prontuários de saúde para recém-nascidos
          </p>
          <div className="mt-12 grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold">24/7</p>
              <p className="text-sm text-blue-100">Acesso ao Sistema</p>
            </div>
            <div>
              <p className="text-3xl font-bold">100%</p>
              <p className="text-sm text-blue-100">Seguro</p>
            </div>
            <div>
              <p className="text-3xl font-bold">∞</p>
              <p className="text-sm text-blue-100">Confiabilidade</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
