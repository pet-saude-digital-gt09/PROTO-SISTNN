import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { mockNewborns, mockLabResults } from '../data/mockData';
import { Download, Printer } from 'lucide-react';

export function MedicalReports() {
  const [selectedPatient, setSelectedPatient] = useState('');
  
  const patient = mockNewborns.find(p => p.id === selectedPatient);
  const labResult = patient ? mockLabResults.find(r => r.rnCode === patient.rnCode) : null;

  return (
    <div className="max-w-5xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Selecionar Laudo do Paciente</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedPatient} onValueChange={setSelectedPatient}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um paciente para ver o laudo..." />
            </SelectTrigger>
            <SelectContent>
              {mockNewborns
                .filter(p => p.status === 'liberated')
                .map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name} - {p.rnCode}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {patient && labResult && (
        <>
          {/* Report Header */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">LAUDO MÉDICO</h2>
                  <p className="text-sm text-gray-600 mt-1">Programa Nacional de Triagem Neonatal</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Baixar PDF
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Printer className="w-4 h-4 mr-2" />
                    Imprimir
                  </Button>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm text-gray-600">Status:</span>
                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold bg-green-100 text-green-800 border-2 border-green-300">
                  LIBERADO
                </span>
                <span className="text-sm text-gray-600">
                  Data de Liberação: {labResult.liberatedDate ? new Date(labResult.liberatedDate).toLocaleDateString() : 'N/A'}
                </span>
              </div>

              {/* Report Content */}
              <div className="border-2 border-border rounded-lg p-8 bg-card" style={{ aspectRatio: '210/297' }}>
                {/* Patient Demographics */}
                <div className="mb-8 pb-6 border-b-2 border-gray-200">
                  <h3 className="text-lg font-bold text-foreground mb-4">INFORMAÇÕES DO PACIENTE</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Código DNV:</p>
                      <p className="font-mono font-bold text-foreground">{patient.rnCode}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Controle Interno:</p>
                      <p className="font-mono font-bold text-foreground">{labResult.internalControl}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Nome do Recém-nascido:</p>
                      <p className="font-semibold text-foreground">{patient.name}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Nome da Mãe:</p>
                      <p className="font-semibold text-foreground">{patient.motherName}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Data de Nascimento:</p>
                      <p className="font-semibold text-foreground">
                        {new Date(patient.dateOfBirth).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Data da Coleta:</p>
                      <p className="font-semibold text-foreground">
                        {new Date(labResult.collectionDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Peso ao Nascer:</p>
                      <p className="font-semibold text-foreground">{patient.weight}g</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Prematuro:</p>
                      <p className="font-semibold text-foreground">{patient.isPremature ? 'Sim' : 'Não'}</p>
                    </div>
                  </div>
                </div>

                {/* Test Results */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-foreground mb-4">RESULTADOS DA TRIAGEM NEONATAL</h3>
                  <div className="space-y-4">
                    {[
                      { name: 'Hipotireoidismo Congênito (TSH)', value: labResult.tsh, unit: 'µU/mL', ref: '0 - 10' },
                      { name: 'Fenilcetonúria (PKU)', value: labResult.pku, unit: 'mg/dL', ref: '0 - 2' },
                      { name: 'Deficiência de G6PD', value: labResult.g6pd, unit: 'U/g Hb', ref: '7 - 20' },
                      { name: 'Hemoglobinopatias', value: labResult.hemoglobinopathies, unit: '', ref: 'Normal (AA)' },
                      { name: 'Deficiência de Biotinidase', value: labResult.biotinidase, unit: 'nmol/min/mL', ref: '3 - 10' },
                      { name: 'Hiperplasia Adrenal Congênita (HAC)', value: labResult.cah, unit: 'ng/mL', ref: '0 - 15' }
                    ].map((test, index) => (
                      <div key={index} className="grid grid-cols-4 gap-4 p-3 bg-muted/50 rounded">
                        <div className="col-span-2">
                          <p className="font-medium text-foreground">{test.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Resultado:</p>
                          <p className="font-bold text-foreground">
                            {test.value} {test.unit}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Referência:</p>
                          <p className="text-sm text-foreground">{test.ref}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Conclusion */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                  <h3 className="font-bold text-blue-900 mb-2">INTERPRETAÇÃO CLÍNICA:</h3>
                  <p className="text-sm text-blue-900">
                    {labResult.status === 'altered' 
                      ? 'ATENÇÃO: Valores anormais detectados. Recomenda-se acompanhamento clínico imediato. Entre em contato com a família para testes adicionais e consulta médica.'
                      : 'Todos os testes de triagem estão dentro dos valores de referência normais. Nenhum acompanhamento imediato necessário. Cuidados pediátricos padrão recomendados.'
                    }
                  </p>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t-2 border-gray-200 text-xs text-gray-600">
                  <p>Laboratório Central de Saúde Pública (LACEN)</p>
                  <p>Profissional Médico Autorizado: Dr. Carlos Mendes - CRM 12345</p>
                  <p>Laudo gerado em: {new Date().toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {!patient && (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            <p>Selecione um paciente para ver seu laudo médico</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
