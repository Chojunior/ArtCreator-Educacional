'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Search, Filter, Grid3x3, List, Star, Download, Eye, Heart, TrendingUp, Clock, Sparkles } from 'lucide-react'

export default function Library() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'Todos', count: 156 },
    { id: 'math', name: 'Matemática', count: 42 },
    { id: 'science', name: 'Ciências', count: 38 },
    { id: 'language', name: 'Português', count: 35 },
    { id: 'history', name: 'História', count: 24 },
    { id: 'games', name: 'Jogos', count: 17 },
  ]

  const activities = [
    {
      id: 1,
      title: 'Caça-Palavras: Animais da Floresta',
      category: 'Jogos',
      author: 'Prof. Maria Silva',
      views: 1234,
      likes: 89,
      downloads: 456,
      rating: 4.8,
      thumbnail: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=300&fit=crop',
      isPremium: false,
    },
    {
      id: 2,
      title: 'Quiz Interativo: Sistema Solar',
      category: 'Ciências',
      author: 'Prof. João Santos',
      views: 2156,
      likes: 145,
      downloads: 678,
      rating: 4.9,
      thumbnail: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&h=300&fit=crop',
      isPremium: true,
    },
    {
      id: 3,
      title: 'Exercícios de Frações - Nível Básico',
      category: 'Matemática',
      author: 'Prof. Ana Costa',
      views: 987,
      likes: 67,
      downloads: 234,
      rating: 4.7,
      thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop',
      isPremium: false,
    },
    {
      id: 4,
      title: 'Flashcards: Verbos Irregulares',
      category: 'Português',
      author: 'Prof. Carlos Lima',
      views: 1567,
      likes: 112,
      downloads: 445,
      rating: 4.6,
      thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop',
      isPremium: false,
    },
    {
      id: 5,
      title: 'Linha do Tempo: Brasil Colônia',
      category: 'História',
      author: 'Prof. Beatriz Alves',
      views: 876,
      likes: 54,
      downloads: 198,
      rating: 4.5,
      thumbnail: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=400&h=300&fit=crop',
      isPremium: true,
    },
    {
      id: 6,
      title: 'Mapa Mental: Fotossíntese',
      category: 'Ciências',
      author: 'Prof. Ricardo Souza',
      views: 1432,
      likes: 98,
      downloads: 367,
      rating: 4.8,
      thumbnail: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400&h=300&fit=crop',
      isPremium: false,
    },
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
                Biblioteca de Recursos
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Buscar atividades..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66] transition-all w-80"
                />
              </div>

              <button className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all">
                <Filter className="w-5 h-5 text-white/60" />
              </button>

              <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-all ${
                    viewMode === 'grid' ? 'bg-[#00FF66] text-black' : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-all ${
                    viewMode === 'list' ? 'bg-[#00FF66] text-black' : 'text-white/60 hover:text-white'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Banner */}
        <div className="bg-gradient-to-br from-[#00FF66]/10 to-[#007BFF]/10 border border-[#00FF66]/20 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Explore Milhares de Atividades
              </h2>
              <p className="text-white/60">Criadas por educadores para educadores</p>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#00FF66]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  2.5k+
                </div>
                <div className="text-sm text-white/60">Atividades</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#007BFF]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  850+
                </div>
                <div className="text-sm text-white/60">Professores</div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? 'bg-[#00FF66] text-black'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {category.name}
              <span className="ml-2 opacity-60">({category.count})</span>
            </button>
          ))}
        </div>

        {/* Activities Grid */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/[0.07] hover:border-[#00FF66]/30 transition-all duration-300 group cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={activity.thumbnail}
                  alt={activity.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {activity.isPremium && (
                  <div className="absolute top-3 right-3 px-3 py-1 bg-[#00FF66] text-black text-xs font-semibold rounded-lg flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Premium
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button className="p-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all">
                    <Eye className="w-5 h-5 text-white" />
                  </button>
                  <button className="p-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all">
                    <Heart className="w-5 h-5 text-white" />
                  </button>
                  <button className="p-3 bg-[#00FF66] rounded-lg hover:opacity-90 transition-all">
                    <Download className="w-5 h-5 text-black" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-[#00FF66]/10 text-[#00FF66] text-xs font-medium rounded-lg">
                    {activity.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-white/60">
                    <Star className="w-3 h-3 text-[#00FF66] fill-[#00FF66]" />
                    <span>{activity.rating}</span>
                  </div>
                </div>

                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                  {activity.title}
                </h3>

                <p className="text-sm text-white/60 mb-4">por {activity.author}</p>

                <div className="flex items-center justify-between text-xs text-white/60">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>{activity.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      <span>{activity.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      <span>{activity.downloads}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00FF66]/30 rounded-lg font-medium transition-all">
            Carregar Mais Atividades
          </button>
        </div>
      </div>
    </div>
  )
}
