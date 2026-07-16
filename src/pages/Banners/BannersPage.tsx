import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { Image as ImageIcon, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { BannerList } from './BannerList';
import { BannerForm } from './BannerForm';
import { Dialog } from '@/components/ui/Dialog';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Skeleton } from '@/components/ui/Skeleton';
import { SearchBar } from '@/components/ui/SearchBar';
import { useBanners, useCreateBanner, useUpdateBanner, useDeleteBanner } from '@/hooks/useBanners';
import { BannerModel } from '@/models';
import { toast } from 'react-hot-toast';

const BannersPage: React.FC = () => {
  // Hooks
  const {
    banners,
    isLoading,
    filters,
    setFilters,
    totalCount
  } = useBanners();

  const { mutate: createBanner, isPending: isCreating } = useCreateBanner();
  const { mutate: updateBanner, isPending: isUpdating } = useUpdateBanner();
  const { mutate: deleteBanner, isPending: isDeleting } = useDeleteBanner();

  // State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<BannerModel | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Handlers
  const handleCreate = () => {
    setSelectedBanner(null);
    setIsFormOpen(true);
  };

  const handleEdit = (banner: BannerModel) => {
    setSelectedBanner(banner);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (banner: BannerModel) => {
    setSelectedBanner(banner);
    setIsDeleteDialogOpen(true);
  };

  const handleFormSubmit = (data: BannerModel) => {
    if (selectedBanner) {
      updateBanner(
        { id: selectedBanner.id, data },
        {
          onSuccess: () => {
            toast.success('Banner atualizado com sucesso!');
            setIsFormOpen(false);
          },
          onError: () => {
            toast.error('Erro ao atualizar banner.');
          }
        }
      );
    } else {
      createBanner(
        { data },
        {
          onSuccess: () => {
            toast.success('Banner criado com sucesso!');
            setIsFormOpen(false);
          },
          onError: () => {
            toast.error('Erro ao criar banner.');
          }
        }
      );
    }
  };

  const handleConfirmDelete = () => {
    if (selectedBanner) {
      deleteBanner(selectedBanner.id, {
        onSuccess: () => {
          toast.success('Banner excluído com sucesso!');
          setIsDeleteDialogOpen(false);
        },
        onError: () => {
          toast.error('Erro ao excluir banner.');
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
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-24 w-full border-b border-gray-100 dark:border-gray-800" />
            ))}
          </div>
        </div>
      );
    }

    if (totalCount === 0 && !filters.search) {
      return (
        <EmptyState
          icon={<ImageIcon className="w-12 h-12" />}
          title="Nenhum banner ativo"
          description="Adicione banners para promover apps ou eventos importantes na tela inicial."
          action={
            <Button variant="outline" leftIcon={<Plus className="w-4 h-4" />} onClick={handleCreate}>
              Adicionar Banner
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
              placeholder="Buscar banners..."
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
              <option value="active">Ativos</option>
              <option value="inactive">Inativos</option>
            </select>
          </div>
        </div>

        <BannerList
          banners={banners}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Banners"
        subtitle={`Gerencie ${totalCount} banners de destaque`}
        action={
          <Button leftIcon={<Plus className="w-4 h-4" />} onClick={handleCreate}>
            Novo Banner
          </Button>
        }
      />

      {renderContent()}

      {/* Form Modal */}
      <Dialog
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={selectedBanner ? 'Editar Banner' : 'Novo Banner'}
        size="xl"
      >
        <BannerForm
          initialData={selectedBanner || {}}
          onSubmit={handleFormSubmit}
          isLoading={isCreating || isUpdating}
        />
      </Dialog>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Excluir Banner"
        description={`Tem certeza que deseja excluir o banner "${selectedBanner?.title}"? Esta ação não pode ser desfeita.`}
        confirmLabel="Excluir"
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default BannersPage;
