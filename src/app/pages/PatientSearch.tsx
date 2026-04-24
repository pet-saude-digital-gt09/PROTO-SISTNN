import { useState, useEffect } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Search, Edit, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

export function PatientSearch() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const fetchPacientes = (query: string = '') => {
    api.get(`/pacientes?q=${encodeURIComponent(query)}`)
      .then(res => {
        setSearchResults(res.data);
      })
      .catch(err => console.error("Erro ao carregar pacientes:", err));
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  const handleSearch = () => {
    fetchPacientes(searchQuery);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Buscar Registros de Recém-Nascidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Insira o DNV de 12 dígitos ou o nome da mãe..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="text-lg h-12"
              />
            </div>
            <Button 
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 h-12 px-8"
            >
              <Search className="w-5 h-5 mr-2" />
              Buscar
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resultados da Busca</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Código DNV</TableHead>
                  <TableHead>Nome do Recém-Nascido</TableHead>
                  <TableHead>Nome da Mãe</TableHead>
                  <TableHead>Data de Nascimento</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {searchResults.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      Nenhum registro encontrado. Tente um termo de busca diferente.
                    </TableCell>
                  </TableRow>
                ) : (
                  searchResults.map((patient) => (
                    <TableRow key={patient.dnv}>
                      <TableCell className="font-mono font-medium">{patient.dnv}</TableCell>
                      <TableCell>{patient.nome}</TableCell>
                      <TableCell>{patient.mae}</TableCell>
                      <TableCell>{patient.nascimento}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          patient.status === 'liberated' ? 'bg-green-100 text-green-800' :
                          patient.status === 'enc_analise' || patient.status === 'collected' ? 'bg-blue-100 text-blue-800' :
                          patient.status === 'enc_recoleta' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {patient.status_label || patient.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => navigate(`/patient/${patient.dnv}`)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Ver
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => navigate(`/register-patient?id=${patient.dnv}`)}
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Editar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
