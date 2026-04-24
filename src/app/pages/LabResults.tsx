import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import { api } from '../../services/api';

export function LabResults() {
  const [selectedResults, setSelectedResults] = useState<string[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [referenceValues, setReferenceValues] = useState<any>({});

  const fetchResults = () => {
    api.get('/resultados-laboratoriais')
      .then(res => {
         setResults(res.data.resultados || []);
         setReferenceValues(res.data.referencias || {});
      })
      .catch(err => {
         toast.error("Erro ao carregar resultados.");
      });
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const toggleSelection = (ci: string) => {
    setSelectedResults(prev =>
      prev.includes(ci) ? prev.filter(x => x !== ci) : [...prev, ci]
    );
  };

  const toggleAll = () => {
    if (selectedResults.length === results.length && results.length > 0) {
      setSelectedResults([]);
    } else {
      setSelectedResults(results.map(r => r.ci));
    }
  };

  const handleLiberate = async () => {
    if (selectedResults.length === 0) {
      toast.error('Por favor, selecione pelo menos um resultado para liberar');
      return;
    }
    
    const hasAlteredResults = results
      .filter(r => selectedResults.includes(r.ci))
      .some(r => r.computed_status === 'alterado');
    
    if (hasAlteredResults) {
      if (!confirm('Aviso: Alguns resultados selecionados estão ALTERADOS. Tem certeza que deseja liberá-los?')) {
        return;
      }
    }
    
    try {
      const res = await api.post('/resultados-laboratoriais/liberar', {
         cis: selectedResults
      });
      toast.success(res.data.message || `${selectedResults.length} resultado(s) liberado(s) com sucesso!`);
      setSelectedResults([]);
      fetchResults(); // refresh table
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Erro ao liberar resultados.");
    }
  };

  const isAbnormal = (test: string, value: number | string | null | undefined) => {
    if (value === null || value === undefined) return false;
    const ref = referenceValues[test];
    if (!ref) return false;
    
    // qualitative check
    if (ref.min === null) {
      return value !== 'Normal'; 
    }
    // numeric check
    const numValue = Number(value);
    if (isNaN(numValue)) return false;
    return numValue < ref.min || numValue > ref.max;
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
                <TableRow className="bg-muted/50">
                  <TableHead className="w-12">
                    <input
                      type="checkbox"
                      checked={results.length > 0 && selectedResults.length === results.length}
                      onChange={toggleAll}
                      className="w-4 h-4"
                    />
                  </TableHead>
                  <TableHead>Controle Interno</TableHead>
                  <TableHead>Código DNV</TableHead>
                  <TableHead>Nome do Paciente</TableHead>
                  <TableHead className="text-right">TSH</TableHead>
                  <TableHead className="text-right">PKU</TableHead>
                  <TableHead className="text-right">IRT</TableHead>
                  <TableHead>Hemoglobinop.</TableHead>
                  <TableHead className="text-right">Biotinidase</TableHead>
                  <TableHead className="text-right">HAC</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.length === 0 ? (
                  <TableRow>
                     <TableCell colSpan={11} className="text-center py-6 text-muted-foreground">
                        Nenhum resultado laboratorial para validar. (Simule importação de arquivos para adicionar dados).
                     </TableCell>
                  </TableRow>
                ) : results.map((result) => {
                  const isAltered = result.computed_status === 'alterado';
                  
                  return (
                    <TableRow
                      key={result.ci}
                      className={isAltered ? 'bg-destructive/15 hover:bg-destructive/25 dark:bg-destructive/20 dark:hover:bg-destructive/30' : ''}
                    >
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedResults.includes(result.ci)}
                          onChange={() => toggleSelection(result.ci)}
                          className="w-4 h-4"
                          disabled={result.status === 'liberado' || result.computed_status === 'pendente'}
                        />
                      </TableCell>
                      <TableCell className="font-mono text-sm">{result.ci}</TableCell>
                      <TableCell className="font-mono text-sm">{result.dnv}</TableCell>
                      <TableCell>{result.nome_rn}</TableCell>
                      <TableCell className="text-right">
                        <span className={isAbnormal('tsh', result.tsh) ? 'font-bold text-red-600' : ''}>
                          {result.tsh ?? '-'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={isAbnormal('pku', result.pku) ? 'font-bold text-red-600' : ''}>
                          {result.pku ?? '-'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={isAbnormal('irt', result.irt) ? 'font-bold text-red-600' : ''}>
                          {result.irt ?? '-'}
                        </span>
                      </TableCell>
                      <TableCell>
                         <span className={isAbnormal('hemoglobinop', result.hemoglobinop) ? 'font-bold text-red-600' : ''}>
                           {result.hemoglobinop ?? '-'}
                         </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={isAbnormal('biotinidase', result.biotinidase) ? 'font-bold text-red-600' : ''}>
                          {result.biotinidase ?? '-'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={isAbnormal('hac', result.hac) ? 'font-bold text-red-600' : ''}>
                          {result.hac ?? '-'}
                        </span>
                      </TableCell>
                      <TableCell>
                        {result.status === 'liberado' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Processado
                          </span>
                        ) : isAltered ? (
                          <div className="flex items-center gap-1 text-red-700">
                            <AlertTriangle className="w-4 h-4" />
                            <span className="font-bold text-sm">ALTERADO</span>
                          </div>
                        ) : result.computed_status === 'normal' ? (
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
            {Object.entries(referenceValues).map(([test, ref]: any) => (
              <div key={test} className="bg-muted/50 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground uppercase font-medium mb-1">{test}</p>
                <p className="text-sm font-semibold text-foreground">
                  {ref.min !== null ? `${ref.min} - ${ref.max} ${ref.unidade}` : 'Normal'}
                  <span className="block text-xs mt-1 opacity-70">{ref.doenca}</span>
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
