import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { dashboardMetrics, weeklyProcessingData } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FlaskConical, Clock, CheckCircle2, XCircle } from 'lucide-react';

export function Dashboard() {
  const metrics = [
    {
      title: 'Amostras de Hoje',
      value: dashboardMetrics.samplesToday,
      icon: FlaskConical,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Resultados Pendentes',
      value: dashboardMetrics.pendingResults,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Laudos Liberados',
      value: dashboardMetrics.liberatedReports,
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Amostras Rejeitadas',
      value: dashboardMetrics.rejectedSamples,
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{metric.title}</p>
                    <p className="text-3xl font-bold text-foreground">{metric.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-full ${metric.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Processing Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Processamento Semanal de Amostras</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyProcessingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="samples" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: 'Nova amostra recebida',
                  patient: 'Lucas Silva Santos',
                  time: '10 min atrás',
                  type: 'success'
                },
                {
                  action: 'Resultado liberado',
                  patient: 'Ana Julia Oliveira',
                  time: '1 hora atrás',
                  type: 'info'
                },
                {
                  action: 'Amostra rejeitada',
                  patient: 'Pedro Costa',
                  time: '2 horas atrás',
                  type: 'error'
                },
                {
                  action: 'Novo registro',
                  patient: 'Maria Santos',
                  time: '3 horas atrás',
                  type: 'success'
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'success' ? 'bg-green-500' :
                    activity.type === 'error' ? 'bg-red-500' :
                    'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.patient}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Visão Geral do Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-foreground">98.5%</p>
              <p className="text-sm text-muted-foreground mt-1">Qualidade das Amostras</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-foreground">2.3 dias</p>
              <p className="text-sm text-muted-foreground mt-1">Tempo Médio de Processamento</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-foreground">4</p>
              <p className="text-sm text-muted-foreground mt-1">Postos de Coleta</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-foreground">156</p>
              <p className="text-sm text-muted-foreground mt-1">Testes Este Mês</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
