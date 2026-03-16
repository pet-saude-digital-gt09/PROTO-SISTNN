import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { mockCollectionUnits } from '../data/mockData';
import { Building2, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

export function CollectionUnits() {
  const [units, setUnits] = useState(mockCollectionUnits);
  const [showAddUnit, setShowAddUnit] = useState(false);
  const [newUnit, setNewUnit] = useState({
    name: '',
    cnesCode: '',
    municipality: '',
    regionalCode: ''
  });

  const handleAddUnit = () => {
    if (!newUnit.name || !newUnit.cnesCode || !newUnit.municipality || !newUnit.regionalCode) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    const unit = {
      id: String(units.length + 1),
      ...newUnit
    };

    setUnits([...units, unit]);
    setShowAddUnit(false);
    setNewUnit({ name: '', cnesCode: '', municipality: '', regionalCode: '' });
  };

  const handleDeleteUnit = (id: string) => {
    if (confirm('Tem certeza de que deseja excluir este posto de coleta?')) {
      setUnits(units.filter(u => u.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Gerenciamento de Postos de Coleta</CardTitle>
          <Button onClick={() => setShowAddUnit(true)} className="bg-blue-600 hover:bg-blue-700">
            <Building2 className="w-4 h-4 mr-2" />
            Adicionar Posto de Coleta
          </Button>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Nome do Posto</TableHead>
                  <TableHead>Código CNES</TableHead>
                  <TableHead>Município</TableHead>
                  <TableHead>Gestão Regional</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {units.map((unit) => (
                  <TableRow key={unit.id}>
                    <TableCell className="font-medium">{unit.name}</TableCell>
                    <TableCell className="font-mono">{unit.cnesCode}</TableCell>
                    <TableCell>{unit.municipality}</TableCell>
                    <TableCell>{unit.regionalCode}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteUnit(unit.id)}
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

      {/* Add Unit Dialog */}
      <Dialog open={showAddUnit} onOpenChange={setShowAddUnit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Posto de Coleta</DialogTitle>
            <DialogDescription>
              Registre um novo posto de coleta de saúde no sistema
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="unitName">Nome do Posto *</Label>
              <Input
                id="unitName"
                value={newUnit.name}
                onChange={(e) => setNewUnit({ ...newUnit, name: e.target.value })}
                placeholder="Nome do hospital ou clínica"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cnesCode">Código CNES *</Label>
              <Input
                id="cnesCode"
                value={newUnit.cnesCode}
                onChange={(e) => setNewUnit({ ...newUnit, cnesCode: e.target.value })}
                placeholder="Código CNES de 7 dígitos"
                maxLength={7}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="municipality">Município *</Label>
              <Input
                id="municipality"
                value={newUnit.municipality}
                onChange={(e) => setNewUnit({ ...newUnit, municipality: e.target.value })}
                placeholder="Nome da cidade"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="regionalCode">Código de Gestão Regional *</Label>
              <Input
                id="regionalCode"
                value={newUnit.regionalCode}
                onChange={(e) => setNewUnit({ ...newUnit, regionalCode: e.target.value })}
                placeholder="ex:, DRS-01"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={() => setShowAddUnit(false)} className="flex-1">
                Cancelar
              </Button>
              <Button onClick={handleAddUnit} className="flex-1 bg-blue-600 hover:bg-blue-700">
                Adicionar Posto
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-4xl font-bold text-blue-600">{units.length}</p>
            <p className="text-sm text-muted-foreground mt-2">Total de Postos de Coleta</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-4xl font-bold text-blue-600">
              {new Set(units.map(u => u.municipality)).size}
            </p>
            <p className="text-sm text-muted-foreground mt-2">Municípios Cobertos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-4xl font-bold text-blue-600">
              {new Set(units.map(u => u.regionalCode)).size}
            </p>
            <p className="text-sm text-muted-foreground mt-2">Regionais de Saúde</p>
          </CardContent>
        </Card>
      </div>

      {/* Information */}
      <Card className="bg-muted">
        <CardContent className="pt-6">
          <h4 className="font-semibold text-foreground mb-3">Requisitos do Posto de Coleta:</h4>
          <ul className="space-y-2 text-sm text-foreground/80">
            <li>• Todos os postos de coleta devem ter um código CNES válido registrado no Ministério da Saúde</li>
            <li>• Os postos devem manter condições adequadas de armazenamento para amostras de sangue (15-30°C)</li>
            <li>• Pessoal treinado é necessário para a técnica correta de coleta de amostras</li>
            <li>• As amostras devem ser transportadas para o LACEN em até 5 dias após a coleta</li>
            <li>• Os postos devem manter registros de coleta e enviar relatórios mensais</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
