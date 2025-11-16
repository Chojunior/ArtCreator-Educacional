import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const error = requestUrl.searchParams.get('error');
  const error_description = requestUrl.searchParams.get('error_description');

  // Se houver erro na confirmação
  if (error) {
    console.error('Erro na confirmação de email:', error, error_description);
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=${encodeURIComponent(error_description || 'Erro ao confirmar email')}`
    );
  }

  // Se houver código de confirmação
  if (code) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        flowType: 'pkce',
      },
    });

    try {
      // Troca o código por uma sessão
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

      if (exchangeError) {
        console.error('Erro ao trocar código por sessão:', exchangeError);
        return NextResponse.redirect(
          `${requestUrl.origin}/login?error=${encodeURIComponent('Erro ao confirmar email. Tente novamente.')}`
        );
      }

      if (data?.session) {
        // Email confirmado com sucesso - redireciona para login com mensagem de sucesso
        return NextResponse.redirect(
          `${requestUrl.origin}/login?confirmed=true`
        );
      }
    } catch (err) {
      console.error('Erro no callback de autenticação:', err);
      return NextResponse.redirect(
        `${requestUrl.origin}/login?error=${encodeURIComponent('Erro ao processar confirmação')}`
      );
    }
  }

  // Fallback: redireciona para login
  return NextResponse.redirect(`${requestUrl.origin}/login`);
}
