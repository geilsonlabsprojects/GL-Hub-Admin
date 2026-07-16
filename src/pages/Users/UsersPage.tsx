import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { Users, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const UsersPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Usuários & Administradores"
        subtitle="Gerencie permissões e acesso ao sistema"
        action={
          <Button leftIcon={<UserPlus className="w-4 h-4" />}>
            Convidar Usuário
          </Button>
        }
      />

      <EmptyState
        icon={<Users className="w-12 h-12" />}
        title="Lista de usuários vazia"
        description="Gerencie quem pode acessar este console administrativo aqui."
        action={
          <Button variant="outline" leftIcon={<UserPlus className="w-4 h-4" />}>
            Convidar Primeiro Usuário
          </Button>
        }
      />
    </div>
  );
};

export default UsersPage;
