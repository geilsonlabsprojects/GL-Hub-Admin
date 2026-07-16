import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { Newspaper, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const NewsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Notícias & Avisos"
        subtitle="Publique atualizações importantes para os usuários"
        action={
          <Button leftIcon={<Plus className="w-4 h-4" />}>
            Nova Notícia
          </Button>
        }
      />

      <EmptyState
        icon={<Newspaper className="w-12 h-12" />}
        title="Sem notícias"
        description="Mantenha seus usuários informados publicando as últimas novidades."
        action={
          <Button variant="outline" leftIcon={<Plus className="w-4 h-4" />}>
            Publicar Notícia
          </Button>
        }
      />
    </div>
  );
};

export default NewsPage;
