import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Chrome } from 'lucide-react';

const LoginPage: React.FC = () => {
  const { loginWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await loginWithGoogle();
    } catch (err: any) {
      setError('Falha ao autenticar com o Google. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-600 text-white mb-4 shadow-lg shadow-primary-500/20">
            <span className="text-2xl font-bold">GH</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">GL Hub Admin</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Console de Administração</p>
        </div>

        <Card className="p-8 shadow-xl border-gray-100 dark:border-gray-800">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Bem-vindo</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Faça login com sua conta corporativa para acessar o painel</p>
          </div>

          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <Button
            onClick={handleLogin}
            isLoading={loading}
            className="w-full py-6 text-base font-semibold"
            leftIcon={<Chrome className="w-5 h-5" />}
          >
            Entrar com Google
          </Button>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Apenas administradores autorizados têm acesso a este sistema.
            </p>
          </div>
        </Card>

        <div className="mt-8 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} GL Hub. Todos os direitos reservados.
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
