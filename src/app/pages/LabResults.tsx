import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { mockLabResults } from '../data/mockData';
import { CheckCircle, AlertTriangle } from 'lucide-react';

export function LabResults() {
  const [selectedResults, setSelectedResults] = useState<string[]>([]);
  const [results] = useState(mockLabResults);

  const toggleSelection = (id: string) => {
    setSelectedResults(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedResults.length === results.length) {
      setSelectedResults([]);
    } else {
      setSelectedResults(results.map(r => r.id));
    }
  };

  const handleLiberate = () => {
    if (selectedResults.length === 0) {
      alert('Por favor, selecione pelo menos um resultado para liberar');
      return;
    }
    
    const hasAlteredResults = results
      .filter(r => selectedResults.includes(r.id))
      .some(r => r.status === 'altered');
    
    if (hasAlteredResults) {
      if (!confirm('Aviso: Alguns resultados selecionados estão ALTERADOS. Tem certeza que deseja liberá-los?')) {
        return;
      }
    }
    
    alert(`${selectedResults.length} resultado(s) liberado(s) com sucesso!`);
    setSelectedResults([]);
  };

  const referenceValues = {
    tsh: { min: 0, max: 10, unit: 'µU/mL' },
    pku: { min: 0, max: 2, unit: 'mg/dL' },
    g6pd: { min: 7, max: 20, unit: 'U/g Hb' },
    biotinidase: { min: 3, max: 10, unit: 'nmol/min/mL' },
    cah: { min: 0, max: 15, unit: 'ng/mL' }
  };

  const isAbnormal = (test: string, value: number) => {
    const ref = referenceValues[test as keyof typeof referenceValues];
    if (!ref) return false;
    return value < ref.min || value > ref.max;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Validação de Resultados</CardTitle>
          <Button
            onClick={handleLiberate}
            disabled={selectedResults.length === 0}
            className="bg-green-600 hover:bg-green-700"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Liberar Selecionados ({selectedResults.length})
          </Button>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-12">
                    <input
                      type="checkbox"
                      checked={selectedResults.length === results.length}
                      onChange={toggleAll}
                      className="w-4 h-4"
                    />
                  </TableHead>
                  <TableHead>Controle Interno</TableHead>
                  <TableHead>Código DNV</TableHead>
                  <TableHead>Nome do Paciente</TableHead>
                  <TableHead className="text-right">TSH</TableHead>
                  <TableHead className="text-right">PKU</TableHead>
                  <TableHead className="text-right">G6PD</TableHead>
                  <TableHead>Hemoglobinop.</TableHead>
                  <TableHead className="text-right">Biotinidase</TableHead>
                  <TableHead className="text-right">HAC</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result) => {
                  const isAltered = result.status === 'altered';
                  
                  return (
                    <TableRow
                      key={result.id}
                      className={isAltered ? 'bg-red-50 hover:bg-red-100' : ''}
                    >
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedResults.includes(result.id)}
                          onChange={() => toggleSelection(result.id)}
                          className="w-4 h-4"
                        />
                      </TableCell>
                      <TableCell className="font-mono text-sm">{result.internalControl}</TableCell>
                      <TableCell className="font-mono text-sm">{result.rnCode}</TableCell>
                      <TableCell>{result.patientName}</TableCell>
                      <TableCell className="text-right">
                        <span className={isAbnormal('tsh', result.tsh) ? 'font-bold text-red-600' : ''}>
                          {result.tsh}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={isAbnormal('pku', result.pku) ? 'font-bold text-red-600' : ''}>
                          {result.pku}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={isAbnormal('g6pd', result.g6pd) ? 'font-bold text-red-600' : ''}>
                          {result.g6pd}
                        </span>
                      </TableCell>
                      <TableCell>{result.hemoglobinopathies}</TableCell>
                      <TableCell className="text-right">
                        <span className={isAbnormal('biotinidase', result.biotinidase) ? 'font-bold text-red-600' : ''}>
                          {result.biotinidase}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={isAbnormal('cah', result.cah) ? 'font-bold text-red-600' : ''}>
                          {result.cah}
                        </span>
                      </TableCell>
                      <TableCell>
                        {isAltered ? (
                          <div className="flex items-center gap-1 text-red-700">
                            <AlertTriangle className="w-4 h-4" />
                            <span className="font-bold text-sm">ALTERADO</span>
                          </div>
                        ) : result.status === 'normal' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Normal
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Pendente
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Reference Values */}
      <Card>
        <CardHeader>
          <CardTitle>Valores de Referência</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(referenceValues).map(([test, ref]) => (
              <div key={test} className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600 uppercase font-medium mb-1">{test}</p>
                <p className="text-sm font-semibold text-gray-900">
                  {ref.min} - {ref.max} {ref.unit}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
