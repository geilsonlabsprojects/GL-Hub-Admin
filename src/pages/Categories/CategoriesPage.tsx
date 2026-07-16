import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { LayoutGrid, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const CategoriesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Categorias"
        subtitle="Organize seus apps e sites em categorias lógicas"
        action={
          <Button leftIcon={<Plus className="w-4 h-4" />}>
            Nova Categoria
          </Button>
        }
      />

      <EmptyState
        icon={<LayoutGrid className="w-12 h-12" />}
        title="Sem categorias"
        description="Crie categorias para ajudar os usuários a encontrarem o que precisam."
        action={
          <Button variant="outline" leftIcon={<Plus className="w-4 h-4" />}>
            Criar Categoria
          </Button>
        }
      />
    </div>
  );
};

export default CategoriesPage;
