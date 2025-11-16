'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, User, Mail, MapPin, Calendar, Award, TrendingUp, Star, Settings, Edit, Camera, Trophy, Target, Zap } from 'lucide-react'

export default function Profile() {
  const [activeTab, setActiveTab] = useState('overview')

  const achievements = [
    { name: 'Primeiro Passo', description: 'Criou sua primeira atividade', icon: Trophy, color: '#00FF66', unlocked: true },
    { name: 'Criador Prolífico', description: 'Criou 25 atividades', icon: Target, color: '#007BFF', unlocked: true },
    { name: 'Estrela da Comunidade', description: 'Recebeu 100 curtidas', icon: Star, color: '#00FF66', unlocked: true },
    { name: 'Mestre Educador', description: 'Criou 50 atividades', icon: Award, color: '#007BFF', unlocked: false },
    { name: 'Influenciador', description: 'Alcançou 500 alunos', icon: Zap, color: '#00FF66', unlocked: false },
    { name: 'Lenda Viva', description: 'Criou 100 atividades', icon: Trophy, color: '#007BFF', unlocked: false },
  ]

  const stats = [
    { label: 'Atividades Criadas', value: '24', change: '+3 este mês' },
    { label: 'Total de Visualizações', value: '3.2k', change: '+12% este mês' },
    { label: 'Curtidas Recebidas', value: '456', change: '+8% este mês' },
    { label: 'Downloads', value: '1.2k', change: '+15% este mês' },
  ]

  const recentActivity = [
    { action: 'Criou', item: 'Quiz de Ciências - Sistema Solar', time: '2 horas atrás' },
    { action: 'Recebeu curtida em', item: 'Atividade de Matemática - Frações', time: '5 horas atrás' },
    { action: 'Conquistou', item: 'Badge: Criador Prolífico', time: '1 dia atrás' },
    { action: 'Compartilhou', item: 'Caça-Palavras Interativo', time: '2 dias atrás' },
  ]

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0D0D0D]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="p-2 hover:bg-white/5 rounded-lg transition-all"
              >
                <ArrowLeft className="w-5 h-5 text-white/60" />
              </Link>
              <h1 className="text-xl font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Meu Perfil
              </h1>
            </div>

            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-all flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Configurações
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-[#00FF66]/10 to-[#007BFF]/10 border border-[#00FF66]/20 rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[#00FF66] to-[#007BFF] flex items-center justify-center text-4xl font-bold text-black">
                MS
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-[#00FF66] rounded-lg hover:opacity-90 transition-all">
                <Camera className="w-4 h-4 text-black" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Maria Silva
                  </h2>
                  <p className="text-white/60 mb-4">Professora de Matemática e Ciências</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>maria.silva@escola.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>São Paulo, SP</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Membro desde Jan 2024</span>
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-all flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Editar
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="text-2xl font-bold mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-white/60 mb-2">{stat.label}</div>
                    <div className="text-xs text-[#00FF66] flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {stat.change}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-8 border-b border-white/10">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-3 text-sm font-medium transition-all ${
              activeTab === 'overview'
                ? 'text-[#00FF66] border-b-2 border-[#00FF66]'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Visão Geral
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`px-4 py-3 text-sm font-medium transition-all ${
              activeTab === 'achievements'
                ? 'text-[#00FF66] border-b-2 border-[#00FF66]'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Conquistas
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`px-4 py-3 text-sm font-medium transition-all ${
              activeTab === 'activity'
                ? 'text-[#00FF66] border-b-2 border-[#00FF66]'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Atividade Recente
          </button>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Sobre Mim
                </h3>
                <p className="text-white/60 leading-relaxed">
                  Professora apaixonada por educação com mais de 10 anos de experiência. Especializada em tornar
                  o aprendizado de matemática e ciências divertido e acessível para todos os alunos. Adoro criar
                  atividades interativas que engajam e inspiram.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Especialidades
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Matemática', 'Ciências', 'Jogos Educativos', 'Atividades Interativas', 'Ensino Fundamental'].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[#00FF66]/10 text-[#00FF66] text-sm rounded-lg border border-[#00FF66]/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Progresso de Nível
                </h3>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/60">Nível 5</span>
                    <span className="text-sm text-[#00FF66]">75%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3">
                    <div className="bg-gradient-to-r from-[#00FF66] to-[#007BFF] h-3 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <p className="text-xs text-white/60">6 atividades até o próximo nível</p>
              </div>

              <div className="bg-gradient-to-br from-[#00FF66]/10 to-[#007BFF]/10 border border-[#00FF66]/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 rounded-xl bg-[#00FF66]/20">
                    <Award className="w-6 h-6 text-[#00FF66]" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Conquistas Desbloqueadas</h4>
                    <p className="text-sm text-white/60">3 de 6 completas</p>
                  </div>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-[#00FF66] h-2 rounded-full" style={{ width: '50%' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`border rounded-2xl p-6 transition-all ${
                  achievement.unlocked
                    ? 'bg-white/5 border-white/10 hover:bg-white/[0.07] hover:border-[#00FF66]/30'
                    : 'bg-white/[0.02] border-white/5 opacity-50'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-4 rounded-xl ${
                      achievement.unlocked ? 'bg-white/10' : 'bg-white/5'
                    }`}
                  >
                    <achievement.icon
                      className="w-8 h-8"
                      style={{ color: achievement.unlocked ? achievement.color : '#666' }}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{achievement.name}</h4>
                    <p className="text-sm text-white/60">{achievement.description}</p>
                    {achievement.unlocked && (
                      <div className="mt-3 text-xs text-[#00FF66]">✓ Desbloqueado</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Atividade Recente
            </h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.04] transition-all"
                >
                  <div className="w-2 h-2 rounded-full bg-[#00FF66] mt-2"></div>
                  <div className="flex-1">
                    <p className="text-white/80">
                      <span className="text-white/60">{activity.action}</span>{' '}
                      <span className="font-medium">{activity.item}</span>
                    </p>
                    <p className="text-sm text-white/40 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
