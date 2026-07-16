import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { Image as ImageIcon, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const BannersPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Banners"
        subtitle="Destaques visuais para a tela inicial do hub"
        action={
          <Button leftIcon={<Plus className="w-4 h-4" />}>
            Novo Banner
          </Button>
        }
      />

      <EmptyState
        icon={<ImageIcon className="w-12 h-12" />}
        title="Nenhum banner ativo"
        description="Adicione banners para promover apps ou eventos importantes."
        action={
          <Button variant="outline" leftIcon={<Plus className="w-4 h-4" />}>
            Adicionar Banner
          </Button>
        }
      />
    </div>
  );
};

export default BannersPage;
