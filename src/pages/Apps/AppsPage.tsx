import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { AppWindow, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const AppsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Aplicações"
        subtitle="Gerencie todos os aplicativos do ecossistema GL Hub"
        action={
          <Button leftIcon={<Plus className="w-4 h-4" />}>
            Novo App
          </Button>
        }
      />

      <EmptyState
        icon={<AppWindow className="w-12 h-12" />}
        title="Nenhum aplicativo encontrado"
        description="Comece adicionando seu primeiro aplicativo para que ele apareça aqui."
        action={
          <Button variant="outline" leftIcon={<Plus className="w-4 h-4" />}>
            Adicionar Aplicativo
          </Button>
        }
      />
    </div>
  );
};

export default AppsPage;
