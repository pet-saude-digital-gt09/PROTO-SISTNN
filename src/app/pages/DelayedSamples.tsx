import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { AlertTriangle } from 'lucide-react';
import { Button } from '../components/ui/button';

export function DelayedSamples() {
  const delayedSamples = [
    {
      id: '1',
      rnCode: '202603010004',
      patientName: 'Sofia Martins',
      motherName: 'Beatriz Martins',
      collectionDate: '2026-03-01',
      collectionUnit: 'Hospital Regional',
      municipality: 'Santos',
      daysElapsed: 12,
      urgency: 'critical'
    },
    {
      id: '2',
      rnCode: '202603020005',
      patientName: 'Miguel Santos',
      motherName: 'Fernanda Santos',
      collectionDate: '2026-03-02',
      collectionUnit: 'Maternidade Central',
      municipality: 'Campinas',
      daysElapsed: 11,
      urgency: 'critical'
    },
    {
      id: '3',
      rnCode: '202603050006',
      patientName: 'Isabella Costa',
      motherName: 'Juliana Costa',
      collectionDate: '2026-03-05',
      collectionUnit: 'Hospital Santa Cruz',
      municipality: 'São Paulo',
      daysElapsed: 8,
      urgency: 'high'
    },
    {
      id: '4',
      rnCode: '202603070007',
      patientName: 'Davi Oliveira',
      motherName: 'Patrícia Oliveira',
      collectionDate: '2026-03-07',
      collectionUnit: 'Maternidade São José',
      municipality: 'São Paulo',
      daysElapsed: 6,
      urgency: 'medium'
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Alert Header */}
      <Card className="bg-red-50 border-red-200">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <AlertTriangle className="w-12 h-12 text-red-600" />
            <div>
              <h3 className="text-xl font-bold text-red-900">
                {delayedSamples.length} Amostras Atrasadas Detectadas
              </h3>
              <p className="text-red-700 mt-1">
                Estas amostras não chegaram ao laboratório no prazo esperado (5 dias)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-4xl font-bold text-foreground">2.8 dias</p>
            <p className="text-sm text-muted-foreground mt-2">Tempo Médio de Chegada (Todas as Amostras)</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-4xl font-bold text-red-600">{delayedSamples.length}</p>
            <p className="text-sm text-muted-foreground mt-2">Amostras Atrasadas &gt; 5 Dias</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-4xl font-bold text-orange-600">
              {delayedSamples.filter(s => s.urgency === 'critical').length}
            </p>
            <p className="text-sm text-muted-foreground mt-2">Prioridade Crítica (&gt; 10 Dias)</p>
          </CardContent>
        </Card>
      </div>

      {/* Delayed Samples Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhes das Amostras Atrasadas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Código DNV</TableHead>
                  <TableHead>Nome do Paciente</TableHead>
                  <TableHead>Nome da Mãe</TableHead>
                  <TableHead>Data de Coleta</TableHead>
                  <TableHead>Posto de Coleta</TableHead>
                  <TableHead>Município</TableHead>
                  <TableHead>Dias Decorridos</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {delayedSamples.map((sample) => (
                  <TableRow key={sample.id}>
                    <TableCell className="font-mono font-medium">{sample.rnCode}</TableCell>
                    <TableCell>{sample.patientName}</TableCell>
                    <TableCell>{sample.motherName}</TableCell>
                    <TableCell>{new Date(sample.collectionDate).toLocaleDateString()}</TableCell>
                    <TableCell>{sample.collectionUnit}</TableCell>
                    <TableCell>{sample.municipality}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold border-2 ${getUrgencyColor(
                          sample.urgency
                        )}`}
                      >
                        {sample.daysElapsed} dias
                        {sample.urgency === 'critical' && (
                          <AlertTriangle className="w-4 h-4 ml-1" />
                        )}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        Contatar Posto
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Action Items */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="text-yellow-900">Ações Recomendadas</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-yellow-900">
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span>
                Contatar os postos de coleta imediatamente para amostras com mais de 10 dias de atraso
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span>
                Verificar se as amostras foram armazenadas e transportadas adequadamente conforme o protocolo
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span>
                Considerar solicitar nova coleta de amostra se o atraso exceder 15 dias
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span>
                Documentar no sistema todas as tentativas de comunicação com os postos de coleta
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
