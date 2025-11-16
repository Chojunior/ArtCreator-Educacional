'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  ArrowLeft,
  BarChart3,
  TrendingUp,
  Users,
  Activity,
  Calendar,
  Download,
  Eye,
  Clock,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface AnalyticsData {
  totalEvents: number;
  userActivity: number;
  avgSessionTime: number;
  completionRate: number;
}

interface RecentEvent {
  id: string;
  event_type: string;
  created_at: string;
  metadata: any;
}

export default function ReportsPage() {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalEvents: 0,
    userActivity: 0,
    avgSessionTime: 0,
    completionRate: 0
  });
  const [recentEvents, setRecentEvents] = useState<RecentEvent[]>([]);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    checkAuth();
    loadAnalytics();
    loadRecentEvents();
  }, [timeRange]);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      window.location.href = '/login';
    }
    setLoading(false);
  };

  const loadAnalytics = async () => {
    try {
      const { data: events, error } = await supabase
        .from('analytics')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Calcular métricas
      const totalEvents = events?.length || 0;
      const uniqueUsers = new Set(events?.map(e => e.user_id)).size;
      
      setAnalytics({
        totalEvents,
        userActivity: uniqueUsers,
        avgSessionTime: 24, // Simulado
        completionRate: 78 // Simulado
      });
    } catch (error) {
      console.error('Erro ao carregar analytics:', error);
    }
  };

  const loadRecentEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('analytics')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setRecentEvents(data || []);
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
    }
  };

  const handleExportReport = () => {
    // Simular exportação de relatório
    const reportData = {
      period: timeRange,
      generated_at: new Date().toISOString(),
      analytics: analytics,
      events: recentEvents
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio-${timeRange}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEventTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'page_view': 'Visualização de Página',
      'activity_created': 'Atividade Criada',
      'activity_completed': 'Atividade Concluída',
      'user_login': 'Login de Usuário',
      'product_view': 'Visualização de Produto'
    };
    return labels[type] || type;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00FF66]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-[#00FF66] hover:bg-transparent"
                onClick={() => window.location.href = '/admin'}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white">Relatórios e Analytics</h1>
              </div>
            </div>
            <Button
              onClick={handleExportReport}
              className="bg-[#00FF66] hover:bg-[#00DD55] text-black font-semibold"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar Relatório
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Time Range Selector */}
        <div className="flex gap-2 mb-8">
          <Button
            onClick={() => setTimeRange('7d')}
            variant={timeRange === '7d' ? 'default' : 'outline'}
            className={timeRange === '7d' ? 'bg-[#00FF66] text-black' : 'border-gray-700 text-gray-300'}
          >
            Últimos 7 dias
          </Button>
          <Button
            onClick={() => setTimeRange('30d')}
            variant={timeRange === '30d' ? 'default' : 'outline'}
            className={timeRange === '30d' ? 'bg-[#00FF66] text-black' : 'border-gray-700 text-gray-300'}
          >
            Últimos 30 dias
          </Button>
          <Button
            onClick={() => setTimeRange('90d')}
            variant={timeRange === '90d' ? 'default' : 'outline'}
            className={timeRange === '90d' ? 'bg-[#00FF66] text-black' : 'border-gray-700 text-gray-300'}
          >
            Últimos 90 dias
          </Button>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-[#00FF66]/10 to-transparent border-[#00FF66]/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#00FF66]/20 flex items-center justify-center">
                <Activity className="w-6 h-6 text-[#00FF66]" />
              </div>
              <TrendingUp className="w-5 h-5 text-[#00FF66]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{analytics.totalEvents}</h3>
            <p className="text-gray-400 text-sm">Total de Eventos</p>
          </Card>

          <Card className="bg-gradient-to-br from-[#007BFF]/10 to-transparent border-[#007BFF]/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#007BFF]/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-[#007BFF]" />
              </div>
              <TrendingUp className="w-5 h-5 text-[#007BFF]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{analytics.userActivity}</h3>
            <p className="text-gray-400 text-sm">Usuários Ativos</p>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{analytics.avgSessionTime}min</h3>
            <p className="text-gray-400 text-sm">Tempo Médio de Sessão</p>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/10 to-transparent border-orange-500/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                <Award className="w-6 h-6 text-orange-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-orange-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{analytics.completionRate}%</h3>
            <p className="text-gray-400 text-sm">Taxa de Conclusão</p>
          </Card>
        </div>

        {/* Recent Events */}
        <Card className="bg-gray-900/50 border-gray-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Eventos Recentes</h3>
            <Eye className="w-5 h-5 text-gray-400" />
          </div>

          <div className="space-y-3">
            {recentEvents.length > 0 ? (
              recentEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#007BFF]/20 flex items-center justify-center">
                      <Activity className="w-5 h-5 text-[#007BFF]" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">{getEventTypeLabel(event.event_type)}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(event.created_at)}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-700 px-2 py-1 rounded">
                    {event.event_type}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Activity className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">Nenhum evento registrado ainda</p>
              </div>
            )}
          </div>
        </Card>

        {/* Info Box */}
        <Card className="bg-purple-500/10 border-purple-500/20 p-6 mt-8">
          <div className="flex items-start gap-3">
            <BarChart3 className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-white font-semibold mb-2">Sobre os Relatórios</h3>
              <p className="text-gray-400 text-sm">
                Esta seção fornece insights detalhados sobre o uso do aplicativo. Os dados são coletados automaticamente 
                e atualizados em tempo real. Você pode exportar relatórios completos em formato JSON para análise externa 
                ou integração com outras ferramentas de analytics.
              </p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
