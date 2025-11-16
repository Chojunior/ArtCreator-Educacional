'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { BookOpen, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  // Verifica se há mensagem de confirmação ou erro na URL
  useEffect(() => {
    const confirmed = searchParams.get('confirmed');
    const urlError = searchParams.get('error');

    if (confirmed === 'true') {
      setSuccess('✅ Email confirmado com sucesso! Agora você pode fazer login.');
      // Remove o parâmetro da URL
      window.history.replaceState({}, '', '/login');
    }

    if (urlError) {
      setError(decodeURIComponent(urlError));
      // Remove o parâmetro da URL
      window.history.replaceState({}, '', '/login');
    }
  }, [searchParams]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isSignUp) {
        // Cadastro com confirmação de email obrigatória
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            // URL para onde o usuário será redirecionado após confirmar o email
            emailRedirectTo: `${window.location.origin}/auth/callback`,
            // Dados adicionais do usuário
            data: {
              email_confirmed: false
            }
          }
        });

        if (error) {
          // Tratamento específico de erros
          if (error.message.includes('User already registered')) {
            throw new Error('Este email já está cadastrado. Tente fazer login ou recuperar sua senha.');
          }
          throw error;
        }

        // Verifica se o usuário foi criado com sucesso
        if (data?.user) {
          // Verifica se o email precisa ser confirmado
          if (data.user.identities && data.user.identities.length === 0) {
            setSuccess('⚠️ Este email já está cadastrado. Verifique sua caixa de entrada ou faça login.');
          } else {
            setSuccess('✅ Cadastro realizado com sucesso! Enviamos um email de confirmação para ' + email + '. Por favor, verifique sua caixa de entrada (e spam) e clique no link para ativar sua conta.');
          }
          
          setEmail('');
          setPassword('');
          
          // Aguarda 5 segundos e muda para tela de login
          setTimeout(() => {
            setIsSignUp(false);
            setSuccess('');
          }, 5000);
        }
      } else {
        // Login
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          // Tratamento específico de erros de login
          if (error.message.includes('Email not confirmed')) {
            throw new Error('⚠️ Por favor, confirme seu email antes de fazer login. Verifique sua caixa de entrada e spam.');
          }
          if (error.message.includes('Invalid login credentials')) {
            throw new Error('Email ou senha incorretos. Verifique suas credenciais e tente novamente.');
          }
          throw error;
        }

        if (data?.user) {
          // Verifica se o email foi confirmado
          if (!data.user.email_confirmed_at) {
            setError('⚠️ Seu email ainda não foi confirmado. Verifique sua caixa de entrada e spam.');
            // Faz logout do usuário
            await supabase.auth.signOut();
            return;
          }
          
          // Redireciona para a página principal
          router.push('/');
          router.refresh();
        }
      }
    } catch (error: any) {
      setError(error.message || 'Erro ao autenticar. Tente novamente.');
      console.error('Erro de autenticação:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00FF66] to-[#007BFF] flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-4xl font-bold text-white">EduDesign</h1>
        </div>

        {/* Card de Login */}
        <Card className="bg-black/50 border-gray-800 backdrop-blur-sm p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              {isSignUp ? 'Criar Conta' : 'Bem-vindo de volta'}
            </h2>
            <p className="text-gray-400">
              {isSignUp 
                ? 'Crie sua conta para começar a criar atividades' 
                : 'Entre para acessar sua plataforma educacional'}
            </p>
          </div>

          {/* Mensagem de Sucesso */}
          {success && (
            <div className="mb-4 p-4 rounded-lg bg-[#00FF66]/10 border border-[#00FF66]/20">
              <p className="text-[#00FF66] text-sm font-medium">{success}</p>
            </div>
          )}

          {/* Mensagem de Erro */}
          {error && (
            <div className="mb-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="pl-10 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#00FF66] focus:ring-[#00FF66]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 pr-10 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#00FF66] focus:ring-[#00FF66]"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {isSignUp && (
                <p className="text-xs text-gray-500 mt-1">Mínimo de 6 caracteres</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#00FF66] to-[#007BFF] hover:opacity-90 text-black font-semibold py-6 transition-all duration-300 hover:scale-105"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-black"></div>
                  {isSignUp ? 'Criando conta...' : 'Entrando...'}
                </div>
              ) : (
                isSignUp ? 'Criar Conta' : 'Entrar'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
                setSuccess('');
              }}
              className="text-gray-400 hover:text-[#00FF66] transition-colors"
            >
              {isSignUp 
                ? 'Já tem uma conta? Entre aqui' 
                : 'Não tem conta? Cadastre-se'}
            </button>
          </div>
        </Card>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Plataforma educacional premium para criação de atividades
        </p>
      </div>
    </div>
  );
}
