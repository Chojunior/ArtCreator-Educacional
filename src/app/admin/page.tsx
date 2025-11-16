'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  LayoutDashboard,
  Package,
  Users,
  BarChart3,
  TrendingUp,
  ShoppingCart,
  UserCheck,
  Activity,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalActivities: 0,
    recentEvents: 0
  });

  useEffect(() => {
    checkAdmin();
    loadAdminStats();
  }, []);

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      window.location.href = '/login';
    }
    setLoading(false);
  };

  const loadAdminStats = async () => {
    try {
      const [products, analytics] = await Promise.all([
        supabase.from('products').select('*', { count: 'exact' }),
        supabase.from('analytics').select('*', { count: 'exact' })
      ]);

      // Buscar contagem de usuários via auth
      const { count: usersCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      const { count: activitiesCount } = await supabase
        .from('activities')
        .select('*', { count: 'exact', head: true });

      setStats({
        totalProducts: products.count || 0,
        totalUsers: usersCount || 0,
        totalActivities: activitiesCount || 0,
        recentEvents: analytics.count || 0
      });
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    }
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
                onClick={() => window.location.href = '/'}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00FF66] to-[#007BFF] flex items-center justify-center">
                  <LayoutDashboard className="w-6 h-6 text-black" />
                </div>
                <h1 className="text-2xl font-bold text-white">Painel Administrativo</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Dashboard Administrativo 🎯
          </h2>
          <p className="text-gray-400">
            Gerencie todos os aspectos do seu aplicativo educacional
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-[#00FF66]/10 to-transparent border-[#00FF66]/20 p-6 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#00FF66]/20 flex items-center justify-center">
                <Package className="w-6 h-6 text-[#00FF66]" />
              </div>
              <TrendingUp className="w-5 h-5 text-[#00FF66]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{stats.totalProducts}</h3>
            <p className="text-gray-400 text-sm">Produtos Cadastrados</p>
          </Card>

          <Card className="bg-gradient-to-br from-[#007BFF]/10 to-transparent border-[#007BFF]/20 p-6 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#007BFF]/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-[#007BFF]" />
              </div>
              <TrendingUp className="w-5 h-5 text-[#007BFF]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{stats.totalUsers}</h3>
            <p className="text-gray-400 text-sm">Usuários Registrados</p>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20 p-6 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Activity className="w-6 h-6 text-purple-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{stats.totalActivities}</h3>
            <p className="text-gray-400 text-sm">Atividades Criadas</p>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/10 to-transparent border-orange-500/20 p-6 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-orange-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-orange-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{stats.recentEvents}</h3>
            <p className="text-gray-400 text-sm">Eventos Registrados</p>
          </Card>
        </div>

        {/* Admin Sections */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-4">Seções Administrativas</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card 
            className="bg-gradient-to-br from-[#00FF66]/5 to-transparent border-[#00FF66]/20 p-6 cursor-pointer hover:scale-105 transition-all duration-300 group"
            onClick={() => window.location.href = '/admin/produtos'}
          >
            <div className="w-14 h-14 rounded-2xl bg-[#00FF66]/20 flex items-center justify-center mb-4 group-hover:bg-[#00FF66]/30 transition-colors">
              <ShoppingCart className="w-7 h-7 text-[#00FF66]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Gerenciar Produtos</h3>
            <p className="text-gray-400 text-sm">
              Adicione, edite e remova produtos do catálogo
            </p>
          </Card>

          <Card 
            className="bg-gradient-to-br from-[#007BFF]/5 to-transparent border-[#007BFF]/20 p-6 cursor-pointer hover:scale-105 transition-all duration-300 group"
            onClick={() => window.location.href = '/admin/usuarios'}
          >
            <div className="w-14 h-14 rounded-2xl bg-[#007BFF]/20 flex items-center justify-center mb-4 group-hover:bg-[#007BFF]/30 transition-colors">
              <UserCheck className="w-7 h-7 text-[#007BFF]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Gerenciar Usuários</h3>
            <p className="text-gray-400 text-sm">
              Visualize e controle os usuários cadastrados
            </p>
          </Card>

          <Card 
            className="bg-gradient-to-br from-purple-500/5 to-transparent border-purple-500/20 p-6 cursor-pointer hover:scale-105 transition-all duration-300 group"
            onClick={() => window.location.href = '/admin/relatorios'}
          >
            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition-colors">
              <BarChart3 className="w-7 h-7 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Relatórios</h3>
            <p className="text-gray-400 text-sm">
              Acesse dados sobre uso do aplicativo e feedback
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
}
