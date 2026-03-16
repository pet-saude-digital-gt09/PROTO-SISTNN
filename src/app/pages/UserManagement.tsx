import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { mockUsers } from '../data/mockData';
import { UserPlus, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

export function UserManagement() {
  const [users, setUsers] = useState(mockUsers);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    profileType: '',
    status: 'Active'
  });

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.profileType) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    const user = {
      id: String(users.length + 1),
      name: newUser.name,
      email: newUser.email,
      profileType: newUser.profileType as any,
      status: newUser.status as any
    };

    setUsers([...users, user]);
    setShowAddUser(false);
    setNewUser({ name: '', email: '', profileType: '', status: 'Active' });
  };

  const handleDeleteUser = (id: string) => {
    if (confirm('Tem certeza de que deseja excluir este usuário?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Gerenciamento de Usuários</CardTitle>
          <Button onClick={() => setShowAddUser(true)} className="bg-blue-600 hover:bg-blue-700">
            <UserPlus className="w-4 h-4 mr-2" />
            Adicionar Novo Usuário
          </Button>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Nome</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Tipo de Perfil</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {user.profileType}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add User Dialog */}
      <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Novo Usuário</DialogTitle>
            <DialogDescription>
              Crie uma nova conta de usuário e defina as permissões de acesso
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userName">Nome Completo *</Label>
              <Input
                id="userName"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                placeholder="Insira o nome completo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="userEmail">E-mail *</Label>
              <Input
                id="userEmail"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="user@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="profileType">Tipo de Perfil *</Label>
              <Select
                value={newUser.profileType}
                onValueChange={(value: string) => setNewUser({ ...newUser, profileType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de perfil" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Administrador</SelectItem>
                  <SelectItem value="Lab Tech">Técnico de Laboratório</SelectItem>
                  <SelectItem value="Collection Unit">Posto de Coleta</SelectItem>
                  <SelectItem value="Analyst">Analista</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select
                value={newUser.status}
                onValueChange={(value: string) => setNewUser({ ...newUser, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={() => setShowAddUser(false)} className="flex-1">
                Cancelar
              </Button>
              <Button onClick={handleAddUser} className="flex-1 bg-blue-600 hover:bg-blue-700">
                Adicionar Usuário
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Access Permissions Info */}
      <Card>
        <CardHeader>
          <CardTitle>Permissões dos Tipos de Perfil</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-2">Administrador</h4>
              <ul className="space-y-1 text-foreground/80">
                <li>• Acesso total ao sistema</li>
                <li>• Gerenciamento de usuários</li>
                <li>• Gerenciamento de postos de coleta</li>
                <li>• Todos os relatórios e exportação de dados</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-2">Técnico de Laboratório</h4>
              <ul className="space-y-1 text-foreground/80">
                <li>• Triagem e validação de amostras</li>
                <li>• Importação de arquivos</li>
                <li>• Validação de resultados laboratoriais</li>
                <li>• Gerar laudos médicos</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-2">Posto de Coleta</h4>
              <ul className="space-y-1 text-foreground/80">
                <li>• Registro de pacientes</li>
                <li>• Formulários de coleta de amostras</li>
                <li>• Visualizar registros de pacientes</li>
                <li>• Acesso limitado a relatórios</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-2">Analista</h4>
              <ul className="space-y-1 text-foreground/80">
                <li>• Visualizar todos os relatórios</li>
                <li>• Exportação de dados</li>
                <li>• Estatísticas operacionais</li>
                <li>• Acesso apenas leitura</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
