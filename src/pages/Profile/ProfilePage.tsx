import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { User, Mail, Shield, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Meu Perfil"
        subtitle="Gerencie suas informações de conta"
      />

      <div className="max-w-2xl">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center mb-8">
              <div className="w-24 h-24 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4 border-4 border-white dark:border-gray-800 shadow-sm">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || ''} className="w-full h-full rounded-full" />
                ) : (
                  <User className="w-10 h-10 text-primary-600 dark:text-primary-400" />
                )}
              </div>
              <h2 className="text-xl font-bold">{user?.displayName || 'Usuário Admin'}</h2>
              <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold rounded-full mt-2">
                Administrador Ativo
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium">{user?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50">
                <Shield className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Nível de Acesso</p>
                  <p className="text-sm font-medium">Administrador Full</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
              <Button
                variant="danger"
                className="w-full"
                leftIcon={<LogOut className="w-4 h-4" />}
                onClick={() => logout()}
              >
                Encerrar Sessão
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
