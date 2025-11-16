import { createClient } from '@supabase/supabase-js';

// Verifica se está no ambiente do navegador
const supabaseUrl = typeof window !== 'undefined' 
  ? process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  : process.env.NEXT_PUBLIC_SUPABASE_URL || '';

const supabaseAnonKey = typeof window !== 'undefined'
  ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Validação das variáveis de ambiente
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('⚠️ Variáveis de ambiente do Supabase não configuradas');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    // Configurações críticas para envio de email de confirmação
    flowType: 'pkce',
  },
  global: {
    headers: {
      'x-client-info': 'supabase-js-web',
    },
  },
});

export type Activity = {
  id: string;
  title: string;
  description: string | null;
  content: string | null;
  category: string | null;
  difficulty: string | null;
  duration: number | null;
  tags: string[] | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};
