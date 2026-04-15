import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit2, 
  Ban, 
  History,
  Beaker,
  Stethoscope,
  ChevronDown,
  ChevronRight,
  Trash2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface Metodo {
  id: string;
  nome: string;
  valorReferencia: string;
  padrao: boolean;
  unidade: string;
}

interface Exame {
  id: number;
  codigoSIA: string;
  nome: string;
  valorProcedimento: number;
  metodos: Metodo[];
}

const initialMockExams: Exame[] = [
  {
    id: 1,
    codigoSIA: '02.02.03.116-0',
    nome: 'FENILALANINA',
    valorProcedimento: 15.50,
    metodos: [
      { id: 'm1', nome: 'Fluorimetria', valorReferencia: '< 2.5', padrao: true, unidade: 'mg/dL' },
      { id: 'm2', nome: 'Espectrometria de Massas', valorReferencia: '< 2.0', padrao: false, unidade: 'mg/dL' }
    ]
  },
  {
    id: 2,
    codigoSIA: '02.02.03.120-8',
    nome: 'TSH NEONATAL',
    valorProcedimento: 12.00,
    metodos: [
      { id: 'm3', nome: 'Fluorimetria', valorReferencia: '< 15.0', padrao: true, unidade: 'µUI/mL' }
    ]
  },
  {
    id: 3,
    codigoSIA: '02.02.03.111-9',
    nome: 'TOXOPLASMOSE IGM',
    valorProcedimento: 18.50,
    metodos: [
      { id: 'm4', nome: 'Quimioluminescência', valorReferencia: '< 0.5', padrao: true, unidade: 'Index' },
      { id: 'm5', nome: 'ELISA', valorReferencia: 'Não Reagente', padrao: false, unidade: '-' }
    ]
  },
  {
    id: 4,
    codigoSIA: '02.02.03.076-7',
    nome: 'HEMOGLOBINOPATIAS',
    valorProcedimento: 22.00,
    metodos: [
      { id: 'm6', nome: 'Cromatografia Líquida (HPLC)', valorReferencia: 'Hb FA', padrao: true, unidade: '-' }
    ]
  }
];

// Utilitário de formatação de grana
const formatPrice = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

export function ExamsManager() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  const [exams, setExams] = useState(initialMockExams);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  // Toggle do acordeão
  const toggleRow = (id: number) => {
    const nextSet = new Set(expandedRows);
    if (nextSet.has(id)) {
      nextSet.delete(id);
    } else {
      nextSet.add(id);
    }
    setExpandedRows(nextSet);
  };

  const filteredExams = exams.filter(exam => {
    const matchesSearch = 
      exam.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.codigoSIA.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeFilter === 'com-metodos') return matchesSearch && exam.metodos.length > 0;
    return matchesSearch;
  });

  // Ações do Exame Pai
  const handleRemoveExam = (id: number, name: string) => {
    if (window.confirm(`Tem certeza que deseja desativar todo o exame "${name}" e todos os seus métodos?`)) {
      setExams(exams.filter(e => e.id !== id));
      toast.success(`Exame ${name} desativado com sucesso!`);
    }
  };

  const handleEditExam = (exam: Exame) => {
    toast.info('Redirecionando para Edição Administrativa...');
    setTimeout(() => {
      const newName = window.prompt(`Altere rápido o Nome do Exame:`, exam.nome);
      if (newName && newName.trim() !== '') {
        setExams(exams.map(e => e.id === exam.id ? { ...e, nome: newName.toUpperCase() } : e));
        toast.success('Nome alterado com sucesso!');
      }
    }, 600);
  };

  const showHistory = (name: string) => {
    toast(`Histórico: ${name}`, {
      description: `Listagem de auditoria do exame pai...\n12/04 - Atualização do Valor Procedimento.\n08/01 - Método secundário adicionado.`,
      duration: 5000,
    });
  };

  // Ações do Método Filho
  const handleRemoveMethod = (examId: number, methodId: string, methodName: string) => {
    if (window.confirm(`Tem certeza que deseja remover o método "${methodName}" rotina?`)) {
      setExams(exams.map(exam => {
        if (exam.id === examId) {
          return { ...exam, metodos: exam.metodos.filter(m => m.id !== methodId) };
        }
        return exam;
      }));
      toast.success(`Método ${methodName} removido!`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Stethoscope className="w-6 h-6 text-primary" />
            Gerenciamento de Exames Unificado
          </h1>
          <p className="text-sm opacity-75 mt-1">Configure o faturamento (SIA/SUS) integrados aos métodos clínicos.</p>
        </div>
        <Button onClick={() => navigate('/exam-builder')} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4" />
          Criar Novo Exame
        </Button>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 items-center justify-between bg-muted/20">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Pesquisar Exame ou Código SIA..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-full bg-background"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button 
              variant={activeFilter === 'com-metodos' ? 'default' : 'outline'} 
              className="gap-2 flex-1 sm:flex-none"
              onClick={() => setActiveFilter(activeFilter === 'com-metodos' ? null : 'com-metodos')}
            >
              <Filter className="w-4 h-4" />
              Com Métodos Ativos
            </Button>
            <Button variant="outline" className="gap-2 flex-1 sm:flex-none">
              <Beaker className="w-4 h-4" />
              Filtrar por Painel
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-foreground">
            <thead className="text-xs uppercase bg-muted text-muted-foreground border-b border-border">
              <tr>
                <th className="px-4 py-3 w-10"></th>
                <th className="px-6 py-3 font-semibold">Exame Principal</th>
                <th className="px-6 py-3 font-semibold">Código SIA/SUS</th>
                <th className="px-6 py-3 font-semibold text-right">Valor Proc.</th>
                <th className="px-6 py-3 font-semibold text-right">Ações Administ.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredExams.map((exam) => {
                const isExpanded = expandedRows.has(exam.id);

                return (
                  <React.Fragment key={exam.id}>
                    {/* LINHA PRINCIPAL (Pai) */}
                    <tr 
                      className={`transition-colors cursor-pointer ${isExpanded ? 'bg-primary/5 dark:bg-primary/10' : 'hover:bg-accent/50'}`}
                      onClick={() => toggleRow(exam.id)}
                    >
                      <td className="px-4 py-4 text-center">
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground shrink-0 rounded-full hover:bg-muted">
                          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </Button>
                      </td>
                      <td className="px-6 py-4 font-bold text-primary dark:text-primary-foreground/90 whitespace-nowrap">
                        {exam.nome} 
                        <span className="ml-2 text-xs font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                          {exam.metodos.length} métodos
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono text-muted-foreground">{exam.codigoSIA}</td>
                      <td className="px-6 py-4 font-medium text-right text-green-700 dark:text-green-400">
                        {formatPrice(exam.valorProcedimento)}
                      </td>
                      <td className="px-6 py-4 text-right space-x-1" onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20" title="Editar Exame" onClick={() => handleEditExam(exam)}>
                          <Edit2 className="w-3.5 h-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800" title="Histórico do Exame" onClick={() => showHistory(exam.nome)}>
                          <History className="w-3.5 h-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20" title="Desativar Exame" onClick={() => handleRemoveExam(exam.id, exam.nome)}>
                          <Ban className="w-3.5 h-3.5" />
                        </Button>
                      </td>
                    </tr>

                    {/* LINHA SECUNDÁRIA (Expansão) */}
                    {isExpanded && (
                      <tr className="bg-muted/10 dark:bg-muted/5 border-b-2 border-border/60">
                        <td colSpan={5} className="px-8 flex-col py-4">
                          <div className="pl-6 border-l-2 border-primary/30 flex flex-col gap-4">
                            
                            <h4 className="text-xs uppercase font-semibold text-muted-foreground tracking-wider flex justify-between items-center">
                              Métodos de Análise Vinculados
                              <Button variant="outline" size="sm" className="h-7 text-xs bg-background" onClick={() => navigate('/exam-builder')}>
                                <Plus className="w-3 h-3 mr-1" /> Novo Método Clínico
                              </Button>
                            </h4>

                            {exam.metodos.length === 0 ? (
                              <div className="text-sm text-muted-foreground italic bg-background p-3 rounded border border-border text-center">
                                Nenhum método diagnóstico configurado para este exame ainda.
                              </div>
                            ) : (
                              <div className="overflow-hidden border border-border rounded-lg bg-background">
                                <table className="w-full text-sm text-left">
                                  <thead className="bg-muted/50 text-muted-foreground border-b border-border">
                                    <tr>
                                      <th className="px-4 py-2 font-medium">Método Utilizado</th>
                                      <th className="px-4 py-2 font-medium">V. Referência</th>
                                      <th className="px-4 py-2 font-medium">Padrão Ouro?</th>
                                      <th className="px-4 py-2 font-medium text-right">Opções</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-border">
                                    {exam.metodos.map((method) => (
                                      <tr key={method.id} className="hover:bg-accent/30">
                                        <td className="px-4 py-3 font-medium flex items-center gap-2">
                                          <Beaker className="w-3.5 h-3.5 text-blue-500 opacity-70" />
                                          {method.nome}
                                        </td>
                                        <td className="px-4 py-3 font-mono text-xs text-muted-foreground"> {method.valorReferencia} {method.unidade} </td>
                                        <td className="px-4 py-3">
                                          {method.padrao ? (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800 uppercase tracking-wider">
                                              Padrão
                                            </span>
                                          ) : (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium text-muted-foreground border border-border uppercase tracking-wider">
                                              Alternativo
                                            </span>
                                          )}
                                        </td>
                                        <td className="px-4 py-2 text-right">
                                           <Button 
                                             variant="ghost" 
                                             size="icon" 
                                             className="h-6 w-6 text-red-500 hover:bg-red-50 hover:text-red-600 rounded" 
                                             title="Excluir Método"
                                             onClick={() => handleRemoveMethod(exam.id, method.id, method.nome)}
                                           >
                                             <Trash2 className="w-3.5 h-3.5" />
                                           </Button>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
          
          {filteredExams.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              Nenhum exame encontrado com os filtros atuais.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
