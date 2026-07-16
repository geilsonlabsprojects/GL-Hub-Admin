import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { Globe, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const SitesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Sites & Portais"
        subtitle="Gerencie os links e portais da web integrados"
        action={
          <Button leftIcon={<Plus className="w-4 h-4" />}>
            Novo Site
          </Button>
        }
      />

      <EmptyState
        icon={<Globe className="w-12 h-12" />}
        title="Nenhum site cadastrado"
        description="Os sites cadastrados aqui aparecerão no hub principal para os usuários."
        action={
          <Button variant="outline" leftIcon={<Plus className="w-4 h-4" />}>
            Adicionar Site
          </Button>
        }
      />
    </div>
  );
};

export default SitesPage;
