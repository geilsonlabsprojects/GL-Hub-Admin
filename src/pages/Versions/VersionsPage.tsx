import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { GitBranch, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const VersionsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Versões"
        subtitle="Histórico e gerenciamento de versões dos aplicativos"
        action={
          <Button leftIcon={<Plus className="w-4 h-4" />}>
            Nova Versão
          </Button>
        }
      />

      <EmptyState
        icon={<GitBranch className="w-12 h-12" />}
        title="Nenhuma versão registrada"
        description="Acompanhe o ciclo de vida dos seus apps gerenciando suas versões."
        action={
          <Button variant="outline" leftIcon={<Plus className="w-4 h-4" />}>
            Registrar Versão
          </Button>
        }
      />
    </div>
  );
};

export default VersionsPage;
