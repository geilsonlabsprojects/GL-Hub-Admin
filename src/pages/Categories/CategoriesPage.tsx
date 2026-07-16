import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { LayoutGrid, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CategoryList } from './CategoryList';
import { CategoryForm } from './CategoryForm';
import { Dialog } from '@/components/ui/Dialog';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Skeleton } from '@/components/ui/Skeleton';
import { SearchBar } from '@/components/ui/SearchBar';
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from '@/hooks/useCategories';
import { CategoryModel } from '@/models';
import { useNotification } from '@/contexts/NotificationContext';

const CategoriesPage: React.FC = () => {
  // Hooks
  const {
    categories,
    isLoading,
    filters,
    setFilters,
    totalCount
  } = useCategories();

  const { mutate: createCategory, isPending: isCreating } = useCreateCategory();
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();
  const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory();

  const { showNotification } = useNotification();

  // State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryModel | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Handlers
  const handleCreate = () => {
    setSelectedCategory(null);
    setIsFormOpen(true);
  };

  const handleEdit = (category: CategoryModel) => {
    setSelectedCategory(category);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (category: CategoryModel) => {
    setSelectedCategory(category);
    setIsDeleteDialogOpen(true);
  };

  const handleFormSubmit = (data: CategoryModel) => {
    if (selectedCategory) {
      updateCategory(
        { id: selectedCategory.id, data },
        {
          onSuccess: () => {
            showNotification('Categoria atualizada com sucesso!', 'success');
            setIsFormOpen(false);
          },
          onError: () => {
            showNotification('Erro ao atualizar categoria.', 'error');
          }
        }
      );
    } else {
      createCategory(
        { data },
        {
          onSuccess: () => {
            showNotification('Categoria criada com sucesso!', 'success');
            setIsFormOpen(false);
          },
          onError: () => {
            showNotification('Erro ao criar categoria.', 'error');
          }
        }
      );
    }
  };

  const handleConfirmDelete = () => {
    if (selectedCategory) {
      deleteCategory(selectedCategory.id, {
        onSuccess: () => {
          showNotification('Categoria excluída com sucesso!', 'success');
          setIsDeleteDialogOpen(false);
        },
        onError: () => {
          showNotification('Erro ao excluir categoria.', 'error');
        }
      });
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          <Skeleton className="h-12 w-full max-w-md rounded-xl" />
          <div className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full border-b border-gray-100 dark:border-gray-800" />
            ))}
          </div>
        </div>
      );
    }

    if (totalCount === 0 && !filters.search) {
      return (
        <EmptyState
          icon={<LayoutGrid className="w-12 h-12" />}
          title="Sem categorias"
          description="Crie categorias para ajudar os usuários a encontrarem o que precisam."
          action={
            <Button variant="outline" leftIcon={<Plus className="w-4 h-4" />} onClick={handleCreate}>
              Criar Categoria
            </Button>
          }
        />
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="w-full md:w-96">
            <SearchBar
              placeholder="Buscar categorias..."
              value={filters.search || ''}
              onChange={(search) => setFilters({ ...filters, search })}
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={filters.status || ''}
              onChange={(e) => setFilters({ ...filters, status: e.target.value as any || undefined })}
            >
              <option value="">Todos os Status</option>
              <option value="active">Ativas</option>
              <option value="inactive">Inativas</option>
            </select>
          </div>
        </div>

        <CategoryList
          categories={categories}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Categorias"
        subtitle={`Gerencie as ${totalCount} categorias do sistema`}
        action={
          <Button leftIcon={<Plus className="w-4 h-4" />} onClick={handleCreate}>
            Nova Categoria
          </Button>
        }
      />

      {renderContent()}

      {/* Form Modal */}
      <Dialog
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={selectedCategory ? 'Editar Categoria' : 'Nova Categoria'}
        size="xl"
      >
        <CategoryForm
          initialData={selectedCategory || {}}
          onSubmit={handleFormSubmit}
          isLoading={isCreating || isUpdating}
        />
      </Dialog>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Excluir Categoria"
        description={`Tem certeza que deseja excluir "${selectedCategory?.name}"? Esta ação não pode ser desfeita.`}
        confirmLabel="Excluir"
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default CategoriesPage;
