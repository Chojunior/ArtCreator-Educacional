'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Search, TrendingUp, Heart, MessageCircle, Share2, Bookmark, Filter, Users, Star, Award } from 'lucide-react'

export default function Community() {
  const [activeFilter, setActiveFilter] = useState('trending')

  const filters = [
    { id: 'trending', name: 'Em Alta', icon: TrendingUp },
    { id: 'recent', name: 'Recentes', icon: Users },
    { id: 'popular', name: 'Populares', icon: Star },
  ]

  const posts = [
    {
      id: 1,
      author: {
        name: 'Prof. Maria Silva',
        avatar: 'MS',
        role: 'Professora de Matemática',
      },
      content: 'Acabei de criar um novo quiz interativo sobre frações! Os alunos adoraram a gamificação. Quem quiser testar, está disponível na biblioteca. 🎯',
      activity: {
        title: 'Quiz Interativo: Frações Divertidas',
        category: 'Matemática',
        thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=250&fit=crop',
      },
      stats: {
        likes: 124,
        comments: 18,
        shares: 32,
      },
      time: '2 horas atrás',
      isLiked: false,
      isSaved: false,
    },
    {
      id: 2,
      author: {
        name: 'Prof. João Santos',
        avatar: 'JS',
        role: 'Professor de Ciências',
      },
      content: 'Compartilhando minha atividade sobre o Sistema Solar! Inclui realidade aumentada e é perfeita para 5º ano. Feedback é sempre bem-vindo! 🚀',
      activity: {
        title: 'Exploração do Sistema Solar',
        category: 'Ciências',
        thumbnail: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&h=250&fit=crop',
      },
      stats: {
        likes: 89,
        comments: 12,
        shares: 24,
      },
      time: '5 horas atrás',
      isLiked: true,
      isSaved: false,
    },
    {
      id: 3,
      author: {
        name: 'Prof. Ana Costa',
        avatar: 'AC',
        role: 'Professora de Português',
      },
      content: 'Dica: Usar flashcards animados aumentou em 40% o engajamento dos meus alunos! Criei um template que vocês podem adaptar. ✨',
      activity: {
        title: 'Flashcards: Verbos Irregulares',
        category: 'Português',
        thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=250&fit=crop',
      },
      stats: {
        likes: 156,
        comments: 24,
        shares: 45,
      },
      time: '1 dia atrás',
      isLiked: false,
      isSaved: true,
    },
  ]

  const topCreators = [
    { name: 'Prof. Maria Silva', activities: 48, followers: 234, avatar: 'MS' },
    { name: 'Prof. João Santos', activities: 42, followers: 198, avatar: 'JS' },
    { name: 'Prof. Ana Costa', activities: 38, followers: 176, avatar: 'AC' },
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
                Comunidade
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Buscar na comunidade..."
                  className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66] transition-all w-80"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filters */}
            <div className="flex items-center gap-3">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    activeFilter === filter.id
                      ? 'bg-[#00FF66] text-black'
                      : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  <filter.icon className="w-4 h-4" />
                  {filter.name}
                </button>
              ))}
            </div>

            {/* Posts */}
            <div className="space-y-6">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/[0.07] hover:border-[#00FF66]/30 transition-all duration-300"
                >
                  {/* Post Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00FF66] to-[#007BFF] flex items-center justify-center text-lg font-bold text-black">
                        {post.author.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <div>
                            <h4 className="font-semibold">{post.author.name}</h4>
                            <p className="text-sm text-white/60">{post.author.role}</p>
                          </div>
                          <span className="text-sm text-white/40">{post.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="px-6 pb-4">
                    <p className="text-white/80 leading-relaxed">{post.content}</p>
                  </div>

                  {/* Activity Preview */}
                  {post.activity && (
                    <div className="mx-6 mb-4 bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden hover:bg-white/[0.04] transition-all cursor-pointer">
                      <img
                        src={post.activity.thumbnail}
                        alt={post.activity.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <span className="px-2 py-1 bg-[#00FF66]/10 text-[#00FF66] text-xs font-medium rounded-lg">
                          {post.activity.category}
                        </span>
                        <h5 className="font-semibold mt-2">{post.activity.title}</h5>
                      </div>
                    </div>
                  )}

                  {/* Post Actions */}
                  <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <button
                        className={`flex items-center gap-2 text-sm transition-all ${
                          post.isLiked ? 'text-[#00FF66]' : 'text-white/60 hover:text-white'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-[#00FF66]' : ''}`} />
                        <span>{post.stats.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-all">
                        <MessageCircle className="w-5 h-5" />
                        <span>{post.stats.comments}</span>
                      </button>
                      <button className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-all">
                        <Share2 className="w-5 h-5" />
                        <span>{post.stats.shares}</span>
                      </button>
                    </div>
                    <button
                      className={`p-2 rounded-lg transition-all ${
                        post.isSaved
                          ? 'text-[#00FF66] bg-[#00FF66]/10'
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Bookmark className={`w-5 h-5 ${post.isSaved ? 'fill-[#00FF66]' : ''}`} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Creators */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <Award className="w-5 h-5 text-[#00FF66]" />
                Top Criadores
              </h3>
              <div className="space-y-4">
                {topCreators.map((creator, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00FF66] to-[#007BFF] flex items-center justify-center text-sm font-bold text-black">
                      {creator.avatar}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{creator.name}</h4>
                      <p className="text-xs text-white/60">
                        {creator.activities} atividades · {creator.followers} seguidores
                      </p>
                    </div>
                    <button className="px-3 py-1 bg-[#00FF66] hover:opacity-90 text-black text-xs font-medium rounded-lg transition-all">
                      Seguir
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Stats */}
            <div className="bg-gradient-to-br from-[#00FF66]/10 to-[#007BFF]/10 border border-[#00FF66]/20 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Estatísticas da Comunidade
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/60">Membros Ativos</span>
                    <span className="text-lg font-bold text-[#00FF66]">2.5k+</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-[#00FF66] h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/60">Atividades Compartilhadas</span>
                    <span className="text-lg font-bold text-[#007BFF]">8.9k+</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-[#007BFF] h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Tópicos em Alta
              </h3>
              <div className="space-y-3">
                {['#MatematicaDivertida', '#CienciasInterativas', '#JogosEducativos', '#EnsinoFundamental'].map((tag) => (
                  <button
                    key={tag}
                    className="w-full text-left px-3 py-2 bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-[#00FF66]/30 rounded-lg text-sm transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
