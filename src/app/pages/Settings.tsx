import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../components/theme-provider';

export function Settings() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  return (
    <div className="max-w-3xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configurações da Conta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">Alterar Senha</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Atualize a senha da sua conta</p>
            </div>
            <Button variant="outline" onClick={() => navigate('/password-recovery')}>
              Alterar
            </Button>
          </div>
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">Notificações por E-mail</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Receber alertas de amostras atrasadas</p>
            </div>
            <Button variant="outline">Configurar</Button>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">Autenticação de Dois Fatores</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Adicione uma camada extra de segurança</p>
            </div>
            <Button variant="outline">Habilitar</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferências do Sistema</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">Visão Padrão (Tema)</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Altere o tema visual do sistema</p>
            </div>
            <Button variant="outline" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              Alternar
            </Button>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">Formato de Data</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">DD/MM/AAAA</p>
            </div>
            <Button variant="outline">Alterar</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
