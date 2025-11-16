'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Wand2, Type, Image, Layout, Shapes, Palette, Download, Save, Eye, Sparkles, Grid3x3, AlignLeft, Circle } from 'lucide-react'

export default function Creator() {
  const [selectedTool, setSelectedTool] = useState('text')
  const [canvasElements, setCanvasElements] = useState<any[]>([])

  const tools = [
    { id: 'text', name: 'Texto', icon: Type },
    { id: 'image', name: 'Imagem', icon: Image },
    { id: 'shape', name: 'Formas', icon: Shapes },
    { id: 'layout', name: 'Layout', icon: Layout },
    { id: 'ai', name: 'IA Magic', icon: Wand2 },
  ]

  const templates = [
    { name: 'Caça-Palavras', category: 'Jogos', color: '#00FF66' },
    { name: 'Quiz Interativo', category: 'Avaliação', color: '#007BFF' },
    { name: 'Flashcards', category: 'Memorização', color: '#00FF66' },
    { name: 'Atividade de Matemática', category: 'Exercícios', color: '#007BFF' },
    { name: 'Mapa Mental', category: 'Organização', color: '#00FF66' },
    { name: 'Linha do Tempo', category: 'História', color: '#007BFF' },
  ]

  const aiSuggestions = [
    'Gerar atividade sobre Sistema Solar',
    'Criar quiz de verbos irregulares',
    'Fazer caça-palavras de animais',
    'Montar exercícios de frações',
  ]

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0D0D0D]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1920px] mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="p-2 hover:bg-white/5 rounded-lg transition-all"
              >
                <ArrowLeft className="w-5 h-5 text-white/60" />
              </Link>
              <div>
                <h1 className="text-lg font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Nova Atividade
                </h1>
                <p className="text-xs text-white/60">Sem título</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-all flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Visualizar
              </button>
              <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-all flex items-center gap-2">
                <Save className="w-4 h-4" />
                Salvar
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-[#00FF66] to-[#00CC52] hover:opacity-90 rounded-lg text-sm font-medium text-black transition-all flex items-center gap-2">
                <Download className="w-4 h-4" />
                Exportar
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Left Sidebar - Tools */}
        <div className="w-20 border-r border-white/10 bg-[#0D0D0D] flex flex-col items-center py-6 gap-4">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setSelectedTool(tool.id)}
              className={`p-3 rounded-xl transition-all group relative ${
                selectedTool === tool.id
                  ? 'bg-[#00FF66] text-black'
                  : 'bg-white/5 hover:bg-white/10 text-white/60'
              }`}
            >
              <tool.icon className="w-5 h-5" />
              <span className="absolute left-full ml-2 px-2 py-1 bg-black/90 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {tool.name}
              </span>
            </button>
          ))}
        </div>

        {/* Properties Panel */}
        <div className="w-80 border-r border-white/10 bg-[#0D0D0D] overflow-y-auto">
          <div className="p-6">
            {selectedTool === 'ai' && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-[#00FF66]" />
                  <h3 className="font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    IA Magic
                  </h3>
                </div>
                <p className="text-sm text-white/60 mb-4">
                  Deixe a IA criar atividades incríveis para você
                </p>

                <div className="space-y-3 mb-6">
                  {aiSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="w-full text-left p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00FF66]/30 rounded-xl text-sm transition-all"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>

                <div className="bg-gradient-to-br from-[#00FF66]/10 to-[#007BFF]/10 border border-[#00FF66]/20 rounded-xl p-4">
                  <textarea
                    placeholder="Descreva a atividade que deseja criar..."
                    className="w-full bg-transparent border-none outline-none text-sm text-white placeholder:text-white/40 resize-none"
                    rows={4}
                  />
                  <button className="w-full mt-3 px-4 py-2 bg-gradient-to-r from-[#00FF66] to-[#00CC52] hover:opacity-90 rounded-lg text-sm font-medium text-black transition-all flex items-center justify-center gap-2">
                    <Wand2 className="w-4 h-4" />
                    Gerar com IA
                  </button>
                </div>
              </div>
            )}

            {selectedTool !== 'ai' && (
              <div>
                <h3 className="font-semibold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Templates Rápidos
                </h3>
                <div className="space-y-3">
                  {templates.map((template, index) => (
                    <button
                      key={index}
                      className="w-full text-left p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00FF66]/30 rounded-xl transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${template.color}20` }}
                        >
                          <Grid3x3 className="w-5 h-5" style={{ color: template.color }} />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{template.name}</div>
                          <div className="text-xs text-white/60">{template.category}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-[#0D0D0D] overflow-auto">
          <div className="min-h-full flex items-center justify-center p-8">
            <div className="w-full max-w-4xl aspect-[210/297] bg-white rounded-2xl shadow-2xl relative overflow-hidden">
              {/* Canvas Grid */}
              <div className="absolute inset-0 opacity-10">
                <div className="w-full h-full" style={{
                  backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}></div>
              </div>

              {/* Empty State */}
              {canvasElements.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                      <Wand2 className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Comece a Criar
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Selecione uma ferramenta ou template para começar
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Properties */}
        <div className="w-80 border-l border-white/10 bg-[#0D0D0D] overflow-y-auto">
          <div className="p-6">
            <h3 className="font-semibold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Propriedades
            </h3>

            <div className="space-y-6">
              {/* Color Picker */}
              <div>
                <label className="text-sm text-white/60 mb-2 block">Cor</label>
                <div className="flex items-center gap-2">
                  <button className="w-10 h-10 rounded-lg bg-[#00FF66] border-2 border-white/20 hover:border-white/40 transition-all"></button>
                  <button className="w-10 h-10 rounded-lg bg-[#007BFF] border-2 border-white/20 hover:border-white/40 transition-all"></button>
                  <button className="w-10 h-10 rounded-lg bg-white border-2 border-white/20 hover:border-white/40 transition-all"></button>
                  <button className="w-10 h-10 rounded-lg bg-black border-2 border-white/20 hover:border-white/40 transition-all"></button>
                </div>
              </div>

              {/* Font Size */}
              <div>
                <label className="text-sm text-white/60 mb-2 block">Tamanho da Fonte</label>
                <input
                  type="range"
                  min="12"
                  max="72"
                  defaultValue="24"
                  className="w-full accent-[#00FF66]"
                />
              </div>

              {/* Alignment */}
              <div>
                <label className="text-sm text-white/60 mb-2 block">Alinhamento</label>
                <div className="flex items-center gap-2">
                  <button className="flex-1 p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all">
                    <AlignLeft className="w-4 h-4 mx-auto" />
                  </button>
                  <button className="flex-1 p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all">
                    <AlignLeft className="w-4 h-4 mx-auto" />
                  </button>
                  <button className="flex-1 p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all">
                    <AlignLeft className="w-4 h-4 mx-auto" />
                  </button>
                </div>
              </div>

              {/* Opacity */}
              <div>
                <label className="text-sm text-white/60 mb-2 block">Opacidade</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="100"
                  className="w-full accent-[#00FF66]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
