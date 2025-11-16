'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  BookOpen, 
  Plus, 
  Library, 
  User, 
  LogOut,
  TrendingUp,
  Award,
  Users,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalActivities: 0,
    completedToday: 0,
    totalStudents: 0,
    avgDuration: 0
  });

  useEffect(() => {
    checkUser();
    loadStats();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      window.location.href = '/login';
    } else {
      setUser(user);
    }
    setLoading(false);
  };

  const loadStats = async () => {
    const { data: activities } = await supabase
      .from('activities')
      .select('*');
    
    setStats({
      totalActivities: activities?.length || 0,
      completedToday: 12,
      totalStudents: 156,
      avgDuration: 45
    });
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      window.location.href = '/login';
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      window.location.href = '/login';
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
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00FF66] to-[#007BFF] flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-black" />
              </div>
              <h1 className="text-2xl font-bold text-white">EduDesign</h1>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <Button 
                variant="ghost" 
                className="text-gray-300 hover:text-[#00FF66] hover:bg-transparent transition-colors"
                onClick={() => window.location.href = '/'}
              >
                Dashboard
              </Button>
              <Button 
                variant="ghost" 
                className="text-gray-300 hover:text-[#00FF66] hover:bg-transparent transition-colors"
                onClick={() => window.location.href = '/biblioteca'}
              >
                <Library className="w-4 h-4 mr-2" />
                Biblioteca
              </Button>
              <Button 
                variant="ghost" 
                className="text-gray-300 hover:text-[#00FF66] hover:bg-transparent transition-colors"
                onClick={() => window.location.href = '/admin'}
              >
                <Plus className="w-4 h-4 mr-2" />
                Criar Atividade
              </Button>
            </nav>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-[#00FF66] hover:bg-transparent"
                onClick={() => window.location.href = '/perfil'}
              >
                <User className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-red-500 hover:bg-transparent"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Bem-vindo de volta! 👋
          </h2>
          <p className="text-gray-400">
            Aqui está um resumo das suas atividades educacionais
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-[#00FF66]/10 to-transparent border-[#00FF66]/20 p-6 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#00FF66]/20 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-[#00FF66]" />
              </div>
              <TrendingUp className="w-5 h-5 text-[#00FF66]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{stats.totalActivities}</h3>
            <p className="text-gray-400 text-sm">Atividades Criadas</p>
          </Card>

          <Card className="bg-gradient-to-br from-[#007BFF]/10 to-transparent border-[#007BFF]/20 p-6 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#007BFF]/20 flex items-center justify-center">
                <Award className="w-6 h-6 text-[#007BFF]" />
              </div>
              <TrendingUp className="w-5 h-5 text-[#007BFF]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{stats.completedToday}</h3>
            <p className="text-gray-400 text-sm">Concluídas Hoje</p>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20 p-6 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{stats.totalStudents}</h3>
            <p className="text-gray-400 text-sm">Estudantes Ativos</p>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/10 to-transparent border-orange-500/20 p-6 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-orange-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{stats.avgDuration}min</h3>
            <p className="text-gray-400 text-sm">Duração Média</p>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card 
            className="bg-gradient-to-br from-[#00FF66]/5 to-transparent border-[#00FF66]/20 p-6 cursor-pointer hover:scale-105 transition-all duration-300 group"
            onClick={() => window.location.href = '/admin'}
          >
            <div className="w-14 h-14 rounded-2xl bg-[#00FF66]/20 flex items-center justify-center mb-4 group-hover:bg-[#00FF66]/30 transition-colors">
              <Plus className="w-7 h-7 text-[#00FF66]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Criar Atividade</h3>
            <p className="text-gray-400 text-sm">
              Desenvolva novas atividades educacionais com IA
            </p>
          </Card>

          <Card 
            className="bg-gradient-to-br from-[#007BFF]/5 to-transparent border-[#007BFF]/20 p-6 cursor-pointer hover:scale-105 transition-all duration-300 group"
            onClick={() => window.location.href = '/biblioteca'}
          >
            <div className="w-14 h-14 rounded-2xl bg-[#007BFF]/20 flex items-center justify-center mb-4 group-hover:bg-[#007BFF]/30 transition-colors">
              <Library className="w-7 h-7 text-[#007BFF]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Biblioteca</h3>
            <p className="text-gray-400 text-sm">
              Acesse todas as atividades e recursos disponíveis
            </p>
          </Card>

          <Card 
            className="bg-gradient-to-br from-purple-500/5 to-transparent border-purple-500/20 p-6 cursor-pointer hover:scale-105 transition-all duration-300 group"
            onClick={() => window.location.href = '/perfil'}
          >
            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition-colors">
              <User className="w-7 h-7 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Meu Perfil</h3>
            <p className="text-gray-400 text-sm">
              Visualize conquistas e progresso pessoal
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
}
