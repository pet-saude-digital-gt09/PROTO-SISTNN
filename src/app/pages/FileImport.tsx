import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';
import { Upload, CheckCircle, FileText } from 'lucide-react';

interface ImportedFile {
  name: string;
  timestamp: string;
  status: 'success' | 'processing' | 'error';
  records: number;
}

export function FileImport() {
  const [importedFiles, setImportedFiles] = useState<ImportedFile[]>([
    {
      name: 'GSP_RESULTS_20260313_batch01.txt',
      timestamp: '2026-03-13 14:30:25',
      status: 'success',
      records: 24
    },
    {
      name: 'GSP_RESULTS_20260312_batch03.txt',
      timestamp: '2026-03-12 16:45:10',
      status: 'success',
      records: 18
    },
    {
      name: 'GSP_RESULTS_20260312_batch02.txt',
      timestamp: '2026-03-12 09:15:42',
      status: 'success',
      records: 22
    }
  ]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    
    files.forEach(file => {
      if (file.name.endsWith('.txt')) {
        const newFile: ImportedFile = {
          name: file.name,
          timestamp: new Date().toLocaleString(),
          status: 'processing',
          records: Math.floor(Math.random() * 30) + 10
        };
        
        setImportedFiles(prev => [newFile, ...prev]);
        
        // Simulate processing
        setTimeout(() => {
          setImportedFiles(prev => 
            prev.map(f => 
              f.name === file.name ? { ...f, status: 'success' as const } : f
            )
          );
        }, 2000);
      } else {
        toast.error('Apenas arquivos .txt são aceitos');
      }
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-4xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Importar Dados do Equipamento GSP</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors cursor-pointer bg-gray-50"
          >
            <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              Arraste e solte arquivos .txt aqui
            </p>
            <p className="text-sm text-gray-500">
              Ou clique para procurar arquivos no seu computador
            </p>
            <p className="text-xs text-gray-400 mt-4">
              Formato aceito: Arquivos de exportação do equipamento GSP (.txt)
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Importação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {importedFiles.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                Nenhum arquivo importado ainda
              </p>
            ) : (
              importedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center gap-4">
                    <FileText className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-500">
                        {file.timestamp} • {file.records} registros
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    {file.status === 'success' && (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">Sucesso</span>
                      </div>
                    )}
                    {file.status === 'processing' && (
                      <div className="flex items-center gap-2 text-blue-600">
                        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm font-medium">Processando...</span>
                      </div>
                    )}
                    {file.status === 'error' && (
                      <div className="flex items-center gap-2 text-red-600">
                        <span className="text-sm font-medium">Erro</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <h4 className="font-semibold text-blue-900 mb-3">Instruções para Importação:</h4>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Exporte os resultados dos testes do equipamento GSP no formato .txt</li>
            <li>• Certifique-se de que todos os números de controle interno coincidam com as amostras registradas</li>
            <li>• Os arquivos são validados automaticamente após a importação</li>
            <li>• Os resultados aparecerão na tabela de Validação de Resultados Laboratoriais</li>
            <li>• Registros inválidos ou duplicados serão sinalizados para revisão</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
