'use client'

import { useState } from 'react'
import { useAuth } from '@/components/AuthProvider'
import { useRouter } from 'next/navigation'
import { LayoutDashboard, Plus, BookOpen, User, Award, TrendingUp, Clock, Star, Users, Zap, Search, Bell, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSignOut = async () => {
    await signOut()
    router.push('/login')
  }

  const stats = [
    { label: 'Atividades Criadas', value: '24', icon: BookOpen, color: '#00FF66' },
    { label: 'Alunos Alcançados', value: '156', icon: Users, color: '#007BFF' },
    { label: 'Conquistas', value: '12', icon: Award, color: '#00FF66' },
    { label: 'Horas Economizadas', value: '48h', icon: Clock, color: '#007BFF' },
  ]

  const recentActivities = [
    { title: 'Atividade de Matemática - Frações', type: 'Matemática', date: '2 horas atrás', views: 45, likes: 12 },
    { title: 'Quiz de Ciências - Sistema Solar', type: 'Ciências', date: '1 dia atrás', views: 89, likes: 23 },
    { title: 'Exercícios de Português - Verbos', type: 'Português', date: '3 dias atrás', views: 67, likes: 18 },
  ]

  const trendingTemplates = [
    { title: 'Caça-Palavras Interativo', category: 'Jogos', uses: 1234 },
    { title: 'Flashcards Animados', category: 'Memorização', uses: 987 },
    { title: 'Quiz Gamificado', category: 'Avaliação', uses: 856 },
  ]

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      {/* Navbar */}
      <nav className="border-b border-white/10 bg-[#0D0D0D]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <span className="text-[#00FF66]">Edu</span>
                <span className="text-white">Design</span>
              </h1>
              
              <div className="hidden md:flex items-center gap-6">
                <Link href="/dashboard" className="flex items-center gap-2 text-[#00FF66] font-medium transition-all">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <Link href="/creator" className="flex items-center gap-2 text-white/60 hover:text-white transition-all">
                  <Plus className="w-4 h-4" />
                  Criar
                </Link>
                <Link href="/library" className="flex items-center gap-2 text-white/60 hover:text-white transition-all">
                  <BookOpen className="w-4 h-4" />
                  Biblioteca
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative hidden lg:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Buscar atividades..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66] transition-all w-64"
                />
              </div>
              
              <button className="relative p-2 hover:bg-white/5 rounded-lg transition-all">
                <Bell className="w-5 h-5 text-white/60" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#00FF66] rounded-full"></span>
              </button>
              
              <Link href="/profile" className="p-2 hover:bg-white/5 rounded-lg transition-all">
                <User className="w-5 h-5 text-white/60" />
              </Link>
              
              <button onClick={handleSignOut} className="p-2 hover:bg-white/5 rounded-lg transition-all">
                <LogOut className="w-5 h-5 text-white/60" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Bem-vindo de volta! 👋
          </h2>
          <p className="text-white/60">Pronto para criar atividades incríveis hoje?</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] hover:border-[#00FF66]/30 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-all">
                  <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
                <TrendingUp className="w-4 h-4 text-[#00FF66]" />
              </div>
              <div className="text-3xl font-bold mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {stat.value}
              </div>
              <div className="text-sm text-white/60">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Ações Rápidas
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/creator"
              className="bg-gradient-to-br from-[#00FF66] to-[#00CC52] rounded-2xl p-6 hover:scale-105 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-black/20">
                  <Plus className="w-6 h-6 text-black" />
                </div>
                <div>
                  <div className="font-semibold text-black text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Nova Atividade
                  </div>
                  <div className="text-black/70 text-sm">Comece do zero</div>
                </div>
              </div>
            </Link>

            <Link
              href="/library"
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] hover:border-[#007BFF]/30 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-[#007BFF]/10">
                  <BookOpen className="w-6 h-6 text-[#007BFF]" />
                </div>
                <div>
                  <div className="font-semibold text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Usar Template
                  </div>
                  <div className="text-white/60 text-sm">Biblioteca completa</div>
                </div>
              </div>
            </Link>

            <Link
              href="/community"
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] hover:border-[#00FF66]/30 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-[#00FF66]/10">
                  <Users className="w-6 h-6 text-[#00FF66]" />
                </div>
                <div>
                  <div className="font-semibold text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Comunidade
                  </div>
                  <div className="text-white/60 text-sm">Explore criações</div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Suas Atividades Recentes
            </h3>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] hover:border-[#00FF66]/30 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-lg mb-1">{activity.title}</h4>
                      <div className="flex items-center gap-3 text-sm text-white/60">
                        <span className="px-2 py-1 bg-[#00FF66]/10 text-[#00FF66] rounded-lg">
                          {activity.type}
                        </span>
                        <span>{activity.date}</span>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-white/5 rounded-lg transition-all">
                      <Settings className="w-5 h-5 text-white/40" />
                    </button>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-white/60">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{activity.views} visualizações</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-[#00FF66]" />
                      <span>{activity.likes} curtidas</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Templates */}
          <div>
            <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Templates em Alta
            </h3>
            <div className="space-y-4">
              {trendingTemplates.map((template, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/[0.07] hover:border-[#007BFF]/30 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-[#007BFF]/10">
                      <Zap className="w-5 h-5 text-[#007BFF]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{template.title}</h4>
                      <p className="text-xs text-white/60">{template.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/60">{template.uses} usos</span>
                    <span className="text-[#00FF66] group-hover:translate-x-1 transition-transform">
                      Usar →
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Gamification Badge */}
            <div className="mt-6 bg-gradient-to-br from-[#00FF66]/10 to-[#007BFF]/10 border border-[#00FF66]/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 rounded-xl bg-[#00FF66]/20">
                  <Award className="w-6 h-6 text-[#00FF66]" />
                </div>
                <div>
                  <h4 className="font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Próxima Conquista
                  </h4>
                  <p className="text-sm text-white/60">Criador Prolífico</p>
                </div>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                <div className="bg-gradient-to-r from-[#00FF66] to-[#007BFF] h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="text-xs text-white/60">3 atividades restantes</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
