import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Printer } from 'lucide-react';
import { api } from '../../services/api';

export function SampleCollection() {
  const [pacientes, setPacientes] = useState<any[]>([]);
  const [postos, setPostos] = useState<string[]>([]);
  const [selectedPatientDnv, setSelectedPatientDnv] = useState('');
  
  const [collectionData, setCollectionData] = useState({
    collectionDate: new Date().toISOString().split('T')[0],
    collectionTime: new Date().toTimeString().split(' ')[0].slice(0, 5),
    collectionUnit: '',
    technician: ''
  });

  useEffect(() => {
    api.get('/pacientes').then(res => setPacientes(res.data)).catch(console.error);
    api.get('/postos').then(res => setPostos(res.data)).catch(console.error);
  }, []);

  const patient = pacientes.find(p => p.dnv === selectedPatientDnv);

  const handleGenerateCode = async () => {
    if (!selectedPatientDnv || !collectionData.collectionUnit || !collectionData.technician) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    try {
      const resp = await api.post('/coletas', {
        dnv: selectedPatientDnv,
        data_coleta: collectionData.collectionDate,
        hora_coleta: collectionData.collectionTime,
        posto_coleta: collectionData.collectionUnit,
        tecnico_coletor: collectionData.technician
      });
      
      toast.success(`Código Barras da Coleta: ${resp.data.codigo_barras}`, {
        description: 'Imprimindo formulário de coleta...'
      });
      
      // Limpa após coletar
      setSelectedPatientDnv('');
      // Atualiza lista de pacientes para refletir a mudança de status
      api.get('/pacientes').then(res => setPacientes(res.data));
    } catch(err: any) {
      toast.error(err.response?.data?.errors?.[0] || 'Erro ao registrar coleta.');
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* Patient Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Selecionar Recém-Nascido Registrado</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedPatientDnv} onValueChange={setSelectedPatientDnv}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um recém-nascido..." />
            </SelectTrigger>
            <SelectContent>
              {pacientes.filter(p => !['collected', 'enc_analise', 'liberated', 'publicado'].includes(p.status)).map((p) => (
                <SelectItem key={p.dnv} value={p.dnv}>
                  {p.nome} - DNV: {p.dnv} (Mãe: {p.mae})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Patient Summary */}
      {patient && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">Resumo do Paciente</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-blue-600 font-medium">Recém-nascido</p>
              <p className="text-blue-900">{patient.nome}</p>
            </div>
            <div>
              <p className="text-blue-600 font-medium">Mãe</p>
              <p className="text-blue-900">{patient.mae}</p>
            </div>
            <div>
              <p className="text-blue-600 font-medium">Data de Nascimento</p>
              <p className="text-blue-900">{patient.nascimento}</p>
            </div>
            <div>
              <p className="text-blue-600 font-medium">Peso</p>
              <p className="text-blue-900">{patient.peso}g</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Collection Form */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhes da Coleta de Amostra</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="collectionDate">Data da Coleta *</Label>
              <Input
                id="collectionDate"
                type="date"
                value={collectionData.collectionDate}
                onChange={(e) =>
                  setCollectionData({ ...collectionData, collectionDate: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="collectionTime">Hora da Coleta *</Label>
              <Input
                id="collectionTime"
                type="time"
                value={collectionData.collectionTime}
                onChange={(e) =>
                  setCollectionData({ ...collectionData, collectionTime: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="collectionUnit">Posto de Coleta *</Label>
              <Select
                value={collectionData.collectionUnit}
                onValueChange={(value: string) =>
                  setCollectionData({ ...collectionData, collectionUnit: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o posto..." />
                </SelectTrigger>
                <SelectContent>
                  {postos.map((p, i) => (
                    <SelectItem key={i} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="technician">Técnico Coletor *</Label>
              <Input
                id="technician"
                value={collectionData.technician}
                onChange={(e) =>
                  setCollectionData({ ...collectionData, technician: e.target.value })
                }
                placeholder="Insira o nome do técnico"
                required
              />
            </div>
          </div>

          <div className="pt-4">
            <Button
              onClick={handleGenerateCode}
              className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg"
              disabled={!selectedPatientDnv}
            >
              <Printer className="w-5 h-5 mr-2" />
              Registrar Coleta & Gerar Etiquetas
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="bg-muted">
        <CardContent className="pt-6">
          <h4 className="font-semibold text-foreground mb-2">Instruções de Coleta:</h4>
          <ul className="space-y-1 text-sm text-foreground/80">
            <li>• Coletar a amostra de sangue do calcanhar do recém-nascido em papel filtro</li>
            <li>• Garantir a saturação adequada de todos os círculos no papel filtro</li>
            <li>• Deixar as amostras secarem em temperatura ambiente por pelo menos 3 horas</li>
            <li>• Armazenar em envelope protetor antes do transporte para o laboratório</li>
            <li>• As amostras devem chegar ao laboratório dentro de 5 dias após a coleta</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
