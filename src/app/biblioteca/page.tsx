'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, type Activity } from '@/lib/supabase';
import { 
  ArrowLeft, 
  Search,
  Filter,
  BookOpen,
  Clock,
  Tag,
  User,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function BibliotecaPage() {
  const router = useRouter();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  useEffect(() => {
    checkUser();
    loadActivities();
  }, []);

  useEffect(() => {
    filterActivities();
  }, [searchTerm, categoryFilter, difficultyFilter, activities]);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.replace('/login');
    }
  };

  const loadActivities = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setActivities(data);
    }
    setLoading(false);
  };

  const filterActivities = () => {
    let filtered = activities;

    // Filtro de busca
    if (searchTerm) {
      filtered = filtered.filter(activity =>
        activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro de categoria
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(activity => activity.category === categoryFilter);
    }

    // Filtro de dificuldade
    if (difficultyFilter !== 'all') {
      filtered = filtered.filter(activity => activity.difficulty === difficultyFilter);
    }

    setFilteredActivities(filtered);
  };

  const getDifficultyColor = (difficulty: string | null) => {
    switch (difficulty) {
      case 'facil': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'medio': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'dificil': return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
      case 'avancado': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getCategoryColor = (category: string | null) => {
    switch (category) {
      case 'matematica': return 'text-blue-400 bg-blue-400/10';
      case 'portugues': return 'text-purple-400 bg-purple-400/10';
      case 'ciencias': return 'text-green-400 bg-green-400/10';
      case 'historia': return 'text-orange-400 bg-orange-400/10';
      case 'geografia': return 'text-cyan-400 bg-cyan-400/10';
      case 'artes': return 'text-pink-400 bg-pink-400/10';
      case 'tecnologia': return 'text-[#00FF66] bg-[#00FF66]/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

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
                onClick={() => router.push('/')}
                className="text-gray-400 hover:text-[#00FF66] hover:bg-transparent"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00FF66] to-[#007BFF] flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Biblioteca de Atividades</h1>
                  <p className="text-sm text-gray-400">{filteredActivities.length} atividades disponíveis</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros */}
        <Card className="bg-black/50 border-gray-800 p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-[#00FF66]" />
            <h2 className="text-lg font-bold text-white">Filtros</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar atividades..."
                className="pl-10 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#00FF66]"
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white">
                <SelectValue placeholder="Todas as categorias" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                <SelectItem value="all">Todas as categorias</SelectItem>
                <SelectItem value="matematica">Matemática</SelectItem>
                <SelectItem value="portugues">Português</SelectItem>
                <SelectItem value="ciencias">Ciências</SelectItem>
                <SelectItem value="historia">História</SelectItem>
                <SelectItem value="geografia">Geografia</SelectItem>
                <SelectItem value="artes">Artes</SelectItem>
                <SelectItem value="tecnologia">Tecnologia</SelectItem>
              </SelectContent>
            </Select>

            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white">
                <SelectValue placeholder="Todas as dificuldades" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                <SelectItem value="all">Todas as dificuldades</SelectItem>
                <SelectItem value="facil">Fácil</SelectItem>
                <SelectItem value="medio">Médio</SelectItem>
                <SelectItem value="dificil">Difícil</SelectItem>
                <SelectItem value="avancado">Avançado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Lista de Atividades */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00FF66]"></div>
          </div>
        ) : filteredActivities.length === 0 ? (
          <Card className="bg-black/50 border-gray-800 p-12 text-center">
            <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Nenhuma atividade encontrada</h3>
            <p className="text-gray-400 mb-6">
              {activities.length === 0 
                ? 'Comece criando sua primeira atividade!' 
                : 'Tente ajustar os filtros de busca'}
            </p>
            <Button
              onClick={() => router.push('/admin')}
              className="bg-gradient-to-r from-[#00FF66] to-[#007BFF] hover:opacity-90 text-black font-semibold"
            >
              Criar Atividade
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivities.map((activity) => (
              <Card
                key={activity.id}
                className="bg-black/50 border-gray-800 p-6 hover:border-[#00FF66]/50 transition-all duration-300 hover:scale-105 cursor-pointer group"
                onClick={() => router.push(`/atividade/${activity.id}`)}
              >
                <div className="flex items-start justify-between mb-4">
                  {activity.category && (
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(activity.category)}`}>
                      {activity.category}
                    </span>
                  )}
                  {activity.difficulty && (
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(activity.difficulty)}`}>
                      {activity.difficulty}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00FF66] transition-colors">
                  {activity.title}
                </h3>

                {activity.description && (
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {activity.description}
                  </p>
                )}

                <div className="flex items-center gap-4 text-xs text-gray-500">
                  {activity.duration && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {activity.duration}min
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(activity.created_at).toLocaleDateString('pt-BR')}
                  </div>
                </div>

                {activity.tags && activity.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {activity.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 rounded bg-gray-800 text-gray-400 text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
