import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ShieldAlert, LogOut } from 'lucide-react';

const AccessDeniedPage: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
      <div className="w-full max-w-md">
        <Card className="p-8 text-center shadow-xl border-red-100 dark:border-red-900/30">
          <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-500">
            <ShieldAlert className="w-10 h-10" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Acesso Restrito</h1>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Olá, <span className="font-semibold text-gray-900 dark:text-gray-100">{user?.displayName || user?.email}</span>.
            Sua conta não possui permissões de administrador ativas para acessar este console.
          </p>

          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-8 text-sm text-amber-800 dark:text-amber-400 text-left">
            <p className="font-semibold mb-1">O que fazer agora?</p>
            <ul className="list-disc list-inside space-y-1 opacity-90">
              <li>Verifique se você usou a conta correta</li>
              <li>Entre em contato com o administrador do sistema</li>
              <li>Solicite a ativação do seu perfil</li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              variant="outline"
              onClick={() => logout()}
              className="w-full"
              leftIcon={<LogOut className="w-4 h-4" />}
            >
              Sair e trocar de conta
            </Button>

            <Button
              variant="ghost"
              onClick={() => window.location.href = '/'}
              className="w-full text-gray-500"
            >
              Voltar para o início
            </Button>
          </div>
        </Card>

        <p className="mt-8 text-center text-xs text-gray-400">
          ID do Usuário: {user?.uid}
        </p>
      </div>
    </div>
  );
};

export default AccessDeniedPage;
