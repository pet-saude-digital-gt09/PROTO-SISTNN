import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  Trash2, 
  Settings, 
  AlertTriangle,
  Beaker,
  CheckCircle2,
  FileText,
  GripVertical,
  Building2,
  DollarSign
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';

type FieldType = 'number' | 'shortText' | 'longText' | 'dropdown' | 'boolean';

interface Parameter {
  id: string;
  name: string;
  type: FieldType;
  unit: string;
  min: number | '';
  max: number | '';
  required: boolean;
}

export function ExamBuilder() {
  const navigate = useNavigate();
  
  // Bloco 1: DADOS ADMINISTRATIVOS DO EXAME (PAI)
  const [examName, setExamName] = useState('NOVO EXAME A CADASTRAR');
  const [codigoSIA, setCodigoSIA] = useState('');
  const [valorProcedimento, setValorProcedimento] = useState<string>('');

  // Bloco 2: DADOS DO MÉTODO CLÍNICO (FILHO) E PARÂMETROS
  const [methodName, setMethodName] = useState('');
  const [isGoldStandard, setIsGoldStandard] = useState(true);
  const [parameters, setParameters] = useState<Parameter[]>([]);

  // Helpers para Parâmetros
  const addParameter = () => {
    const newParam: Parameter = {
      id: Math.random().toString(36).substr(2, 9),
      name: `Parâmetro de Medição ${parameters.length + 1}`,
      type: 'number',
      unit: '',
      min: '',
      max: '',
      required: true,
    };
    setParameters([...parameters, newParam]);
  };

  const updateParameter = (id: string, field: keyof Parameter, value: any) => {
    setParameters(parameters.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const removeParameter = (id: string) => {
    setParameters(parameters.filter(p => p.id !== id));
  };

  const handleSaveModel = () => {
    // Validação fake básica
    if (!examName || !codigoSIA || !methodName) {
      toast.error('Preencha os campos vitais administrativos e do método antes de salvar.');
      return;
    }

    toast.success('Molde de exame unificado salvo com sucesso!', {
      description: `O Exame Pai (${examName}) e seu primeiro Método Clínico Padrão (${methodName}) foram vinculados ao SUS e criados.`,
    });
    setTimeout(() => {
      navigate('/exams-manager');
    }, 2000);
  };

  return (
    <div className="space-y-6 h-full flex flex-col pt-2">
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/exams-manager')} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Cadastro Unificado Exame/Método</h1>
            <p className="text-sm opacity-75">Configure o bloco administrativo do SUS e projete simultaneamente o formulário do 1º método diagnóstico dele.</p>
          </div>
        </div>
        <Button onClick={handleSaveModel} className="gap-2 bg-green-600 hover:bg-green-700 text-white">
          <Save className="w-4 h-4" />
          Finalizar Cadastro Combinado
        </Button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0 overflow-hidden pb-4">
        
        {/* COLUNA ESQUERDA: CONFIGURAÇÃO */}
        <div className="lg:col-span-7 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
          
          {/* BLOCO ADMINISTRATIVO (EXAME PAI) */}
          <div className="bg-blue-50/50 dark:bg-blue-900/10 border-2 border-blue-200 dark:border-blue-900/50 rounded-xl p-6 shadow-sm">
             <div className="flex items-center gap-2 mb-5 border-b border-blue-200/50 dark:border-blue-900/50 pb-3">
              <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-lg font-bold text-blue-900 dark:text-blue-300">A. Dados Administrativos (Exame SUS)</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="space-y-2 md:col-span-1">
                <label className="text-sm font-semibold text-foreground">Nome da Doença/Exame Principal</label>
                <Input 
                  placeholder="Ex: FENILALANINA" 
                  value={examName}
                  onChange={(e) => setExamName(e.target.value.toUpperCase())}
                  className="uppercase font-bold"
                />
              </div>
              <div className="space-y-2 relative">
                <label className="text-sm font-semibold text-foreground">Código SIA/SUS</label>
                <Input 
                  placeholder="Ex: 02.02.03...  " 
                  value={codigoSIA}
                  onChange={(e) => setCodigoSIA(e.target.value)}
                  className="font-mono bg-background"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Valor do Procedimento (R$)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input 
                    type="number"
                    step="0.01"
                    placeholder="15.50" 
                    value={valorProcedimento}
                    onChange={(e) => setValorProcedimento(e.target.value)}
                    className="pl-9 font-mono bg-background"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* BLOCO CLÍNICO (MÉTODO FILHO) */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm mt-8">
            <div className="flex items-center gap-2 mb-5 border-b border-border pb-3">
              <Settings className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-card-foreground">B. Configuração do Método Inicial & Molde Analítico</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-medium text-foreground">Nome Acadêmico do Método</label>
                <Input 
                  placeholder="Ex: Quimioluminescência / Fluorimetria" 
                  value={methodName}
                  onChange={(e) => setMethodName(e.target.value)}
                />
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/50">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Será o Método "Padrão"?</h3>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={isGoldStandard}
                    onChange={(e) => setIsGoldStandard(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none ring-offset-background peer-focus:ring-2 peer-focus:ring-primary/60 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
                </label>
              </div>
            </div>

            {/* Parâmetros Construtor */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Beaker className="w-4 h-4 text-primary" />
                <h3 className="text-md font-semibold text-card-foreground">Campos do Molde para o Analista</h3>
              </div>
              <Button onClick={addParameter} variant="secondary" size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Adicionar Campo Clínico
              </Button>
            </div>

            {parameters.length === 0 ? (
              <div className="text-center p-8 border-2 border-dashed border-border rounded-lg text-muted-foreground/80 bg-muted/10">
                <FileText className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="font-medium text-muted-foreground">Projeto vazio.</p>
                <p className="text-xs mt-1">Crie os campos (como "Insira Taxa XY" ou Dropdowns) que ditarão toda a regra de preenchimento quando um paciente fizer o exame de {examName || "..."}.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {parameters.map((param) => (
                  <div key={param.id} className="relative p-4 border border-border/60 bg-background rounded-lg shadow-sm group hover:border-primary/50 transition-colors">
                    <div className="absolute left-2 top-6 text-muted-foreground/30 cursor-grab hover:text-foreground/50">
                      <GripVertical className="w-4 h-4" />
                    </div>
                    
                    <div className="pl-6 space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-5 gap-3">
                          <div className="space-y-1 sm:col-span-3">
                            <label className="text-xs font-semibold text-foreground">Título Visível</label>
                            <Input 
                              size={1} 
                              value={param.name} 
                              onChange={(e) => updateParameter(param.id, 'name', e.target.value)}
                              placeholder="O que o analista vai ler:" 
                            />
                          </div>
                          <div className="space-y-1 sm:col-span-2">
                            <label className="text-xs font-semibold text-foreground">Formato</label>
                            <select 
                              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                              value={param.type}
                              onChange={(e) => updateParameter(param.id, 'type', e.target.value as FieldType)}
                            >
                              <option value="number">Númerico Exato</option>
                              <option value="shortText">Info Texto (Curta)</option>
                              <option value="dropdown">Menu de Opções</option>
                              <option value="boolean">Switch Sim/Não</option>
                              <option value="longText">Laudo Gigante Livre</option>
                            </select>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeParameter(param.id)} className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 shrink-0">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      {param.type === 'number' && (
                        <div className="grid grid-cols-3 gap-3 pt-3 mt-3 border-t border-border/50">
                          <div className="space-y-1">
                            <label className="text-xs text-muted-foreground font-medium">Unidade Médica</label>
                            <Input size={1} placeholder="mg/dL, g/L..." value={param.unit} onChange={(e) => updateParameter(param.id, 'unit', e.target.value)} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs text-muted-foreground font-medium">Valor Tolerância Mínima</label>
                            <Input type="number" size={1} value={param.min} onChange={(e) => updateParameter(param.id, 'min', e.target.value)} placeholder="Ex: 0.0" className="text-green-600 font-mono" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs text-muted-foreground font-medium">Valor Limitação Máxima</label>
                            <Input type="number" size={1} value={param.max} onChange={(e) => updateParameter(param.id, 'max', e.target.value)} placeholder="Ex: 99.9" className="text-red-500 font-mono" />
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 pt-3 mt-3 border-t border-border/50">
                        <input 
                          type="checkbox" 
                          id={`req-${param.id}`} 
                          checked={param.required}
                          onChange={(e) => updateParameter(param.id, 'required', e.target.checked)}
                          className="rounded border-border text-primary focus:ring-primary w-4 h-4 outline-none transition-all"
                        />
                        <label htmlFor={`req-${param.id}`} className="text-xs font-medium text-muted-foreground cursor-pointer hover:text-foreground">
                          Ancorar preenchimento como **estritamente obrigatório** para registro do laudo.
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* REGRAS */}
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 rounded-xl p-5 mt-8 opacity-80 hover:opacity-100 transition-opacity">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 mt-0.5 text-amber-600 dark:text-amber-500 shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-amber-900 dark:text-amber-300">Lógica de Triagem Condicional</h3>
                <p className="text-xs text-amber-800/80 dark:text-amber-400/80 mt-1">Este componente protótipo ainda não abarca o salvamento de fórmulas lógicas complexas cruzando campos diferentes (Ex: Campo2 &times; Campo1 = Positivo). Em produção, este bloco traduziria o construtor acima em gatilhos JavaScript.</p>
              </div>
            </div>
          </div>

        </div>

        {/* COLUNA DIREITA: PREVIEW DA TELINHA SIMULANDO O LAUDO */}
        <div className="lg:col-span-5 rounded-xl border border-dashed border-border shadow-inner p-4 h-full flex flex-col bg-zinc-50 dark:bg-zinc-950/20 relative" style={{ overflowY: 'auto' }}>
          
          <div className="absolute inset-0 z-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none rounded-xl"></div>
          
          <div className="flex items-center justify-center gap-2 mb-4 shrink-0 z-10 w-full bg-background border border-border shadow-sm py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span>Simulador de como ficará a tela Final</span>
          </div>
          
          <div className="bg-background rounded-b-lg border-2 border-primary/20 p-5 shadow-2xl flex-1 z-10 relative mt-2 relative top-0 rounded-t-sm shadow-black/10">
            {/* Cabedelo Azul */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-primary/70"></div>
            
            <div className="border-b border-border pb-4 mb-5 pt-2">
              <div className="flex justify-between items-start mb-2">
                <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-[10px] font-extrabold uppercase rounded border border-blue-200 dark:border-blue-800/50">AMOSTRA #3914.Z</span>
                <span className="text-[10px] text-muted-foreground font-mono">SIA: {codigoSIA || '-------'}</span>
              </div>
              <h3 className="text-lg font-black text-foreground uppercase tracking-tight leading-tight">{examName || '[Nome do Exame]'}</h3>
              
              <div className="mt-2 flex flex-wrap gap-2 items-center text-xs">
                <span className="text-muted-foreground bg-muted px-1.5 py-0.5 rounded font-medium flex items-center gap-1">
                  <Beaker className="w-3 h-3" /> Met: {methodName || 'Pendente'}
                </span>
                {isGoldStandard && <span className="text-amber-700 bg-amber-100 border border-amber-200 dark:bg-amber-900/30 dark:border-amber-800/50 dark:text-amber-400 px-1 py-0.5 rounded font-black tracking-widest text-[9px]">DIAG. OURO</span>}
              </div>
            </div>

            <div className="pt-2 text-xs font-semibold text-foreground/50 uppercase tracking-widest mb-4">Dados da Amostra a preencher:</div>

            {parameters.length === 0 ? (
              <div className="flex justify-center p-6 border-2 border-dashed border-muted rounded opacity-50">
               <span className="text-xs font-medium text-center italic">Crie variáveis campos do laudo na área de configurações.</span>
              </div>
            ) : (
              <div className="space-y-5">
                {parameters.map((param) => (
                  <div key={`preview-${param.id}`} className="space-y-1.5 opacity-90 group relative">
                    <label className="text-[13px] font-semibold text-foreground capitalize flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        {param.name || <span className="text-foreground/30">(Sem Nome)</span>}
                        {param.required && <span className="text-red-500 font-bold">*</span>}
                      </span>
                      {param.type === 'number' && (
                        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider font-mono">
                          Min:{param.min || '∅'} ~ Max:{param.max || '∅'}
                        </span>
                      )}
                    </label>
                    
                    <div className="flex items-center gap-2">
                      {param.type === 'number' && (
                        <div className="relative flex-1 group-hover:scale-[1.01] transition-transform">
                          <Input disabled className="bg-muted/30 font-mono text-muted-foreground font-bold shadow-inner" placeholder="___.___" />
                           {param.unit && <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground/60 font-bold tracking-wider">{param.unit}</div>}
                        </div>
                      )}
                      {param.type === 'shortText' && <Input disabled className="bg-muted/30 text-muted-foreground/60" placeholder="Redija..." />}
                      {param.type === 'longText' && <textarea disabled className="flex min-h-[90px] w-full rounded-md border border-input bg-muted/30 px-3 py-2 text-sm text-muted-foreground/60 shadow-inner" placeholder="Observações Técnicas e Avaliações Genéticas Acumuladas..." />}
                      {param.type === 'dropdown' && <select disabled className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-muted/30 px-3 py-2 text-sm text-muted-foreground/60"><option>-- Abrir listagem --</option></select>}
                      {param.type === 'boolean' && (
                        <div className="flex items-center gap-6 py-1 pl-1">
                          <label className="flex items-center gap-2 text-sm font-semibold text-muted-foreground"><input type="radio" disabled checked className="w-4 h-4 text-primary" /> Confirmo</label>
                          <label className="flex items-center gap-2 text-sm font-semibold text-muted-foreground opacity-50"><input type="radio" disabled className="w-4 h-4 text-primary"/> Nego</label>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="mt-8 mb-2 border-t border-border pt-4 flex gap-2">
               <Button disabled className="w-full font-bold shadow opacity-50" size="sm">Registrar Resultado no Prontuário</Button>
            </div>
            <div className="text-center">
              <span className="text-[10px] text-muted-foreground/40 font-medium font-mono">R$ {valorProcedimento || '0,00'} • Repasse SUS SIMULADO</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
