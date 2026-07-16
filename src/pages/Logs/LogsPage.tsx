import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { ScrollText, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const LogsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Logs do Sistema"
        subtitle="Rastreabilidade e auditoria de ações administrativas"
        action={
          <Button variant="outline" leftIcon={<RefreshCw className="w-4 h-4" />}>
            Atualizar
          </Button>
        }
      />

      <EmptyState
        icon={<ScrollText className="w-12 h-12" />}
        title="Nenhum log registrado"
        description="As ações realizadas no sistema serão listadas aqui para auditoria."
      />
    </div>
  );
};

export default LogsPage;
