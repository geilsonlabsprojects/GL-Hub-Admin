import React, { useState, useMemo } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { Globe, Plus, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { useSites } from '@/hooks/useSites';
import { useCreateSite } from '@/hooks/useCreateSite';
import { useUpdateSite } from '@/hooks/useUpdateSite';
import { useDeleteSite } from '@/hooks/useDeleteSite';
import { useDuplicateSite } from '@/hooks/useDuplicateSite';
import { SiteList } from '@/components/sites/SiteList';
import { SiteFilters } from '@/components/sites/SiteFilters';
import { SiteForm } from '@/components/sites/SiteForm';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { DuplicateSiteDialog } from '@/components/sites/DuplicateSiteDialog';
import { useNotification } from '@/contexts/NotificationContext';
import { SiteModel } from '@/models/siteModel';

const SitesPage: React.FC = () => {
  const { showNotification } = useNotification();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedSite, setSelectedSite] = useState<SiteModel | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDuplicateDialogOpen, setIsDuplicateDialogOpen] = useState(false);

  const {
    sites,
    isLoading,
    filters,
    setFilters,
    clearFilters,
  } = useSites();

  const { createSiteAsync, isLoading: isCreating } = useCreateSite();
  const { updateSiteAsync, isLoading: isUpdating } = useUpdateSite();
  const { deleteSiteAsync, isLoading: isDeleting } = useDeleteSite();
  const { duplicateSiteAsync, isLoading: isDuplicating } = useDuplicateSite();

  const categories = useMemo(() => {
    return Array.from(new Set(sites.map(s => s.categoryId).filter(Boolean))) as string[];
  }, [sites]);

  const handleAddNew = () => {
    setSelectedSite(null);
    setIsFormOpen(true);
  };

  const handleEdit = (site: SiteModel) => {
    setSelectedSite(site);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (site: SiteModel) => {
    setSelectedSite(site);
    setIsDeleteDialogOpen(true);
  };

  const handleDuplicateClick = (site: SiteModel) => {
    setSelectedSite(site);
    setIsDuplicateDialogOpen(true);
  };

  const handleFormSubmit = async (data: SiteModel) => {
    try {
      if (selectedSite) {
        await updateSiteAsync({ siteId: selectedSite.siteId, data });
        showNotification('Site atualizado com sucesso!', 'success');
      } else {
        await createSiteAsync(data);
        showNotification('Site criado com sucesso!', 'success');
      }
      setIsFormOpen(false);
      setSelectedSite(null);
    } catch (error) {
      showNotification('Erro ao salvar site.', 'error');
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedSite) return;
    try {
      await deleteSiteAsync(selectedSite.siteId);
      showNotification('Site excluído com sucesso!', 'success');
      setIsDeleteDialogOpen(false);
      setSelectedSite(null);
    } catch (error) {
      showNotification('Erro ao excluir site.', 'error');
    }
  };

  const handleConfirmDuplicate = async (newSiteId: string) => {
    if (!selectedSite) return;
    try {
      await duplicateSiteAsync({ sourceSiteId: selectedSite.siteId, newSiteId });
      showNotification('Site duplicado com sucesso!', 'success');
      setIsDuplicateDialogOpen(false);
      setSelectedSite(null);
    } catch (error) {
      showNotification('Erro ao duplicar site.', 'error');
    }
  };

  if (isFormOpen) {
    return (
      <div className="space-y-6">
        <PageHeader
          title={selectedSite ? 'Editar Site' : 'Novo Site'}
          subtitle={selectedSite ? `Editando ${selectedSite.name}` : 'Cadastre um novo site no hub'}
          action={
            <Button
              variant="outline"
              leftIcon={<ArrowLeft className="w-4 h-4" />}
              onClick={() => setIsFormOpen(false)}
            >
              Voltar
            </Button>
          }
        />
        <SiteForm
          initialData={selectedSite || undefined}
          onSubmit={handleFormSubmit}
          isLoading={isCreating || isUpdating}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sites & Portais"
        subtitle="Gerencie os links e portais da web integrados"
        action={
          <Button leftIcon={<Plus className="w-4 h-4" />} onClick={handleAddNew}>
            Novo Site
          </Button>
        }
      />

      <SiteFilters
        categories={categories.length > 0 ? categories : ['Serviços', 'Notícias', 'Entretenimento', 'Utilitários']}
        currentFilters={{
          search: filters.search || '',
          category: filters.category || '',
          status: filters.status || '',
        }}
        onSearchChange={(search) => setFilters({ ...filters, search })}
        onCategoryChange={(category) => setFilters({ ...filters, category })}
        onStatusChange={(status) => setFilters({ ...filters, status: status as any })}
        onClearFilters={clearFilters}
      />

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-20 w-full rounded-2xl" />
          <Skeleton className="h-20 w-full rounded-2xl" />
          <Skeleton className="h-20 w-full rounded-2xl" />
        </div>
      ) : sites.length > 0 ? (
        <SiteList
          sites={sites}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          onDuplicate={handleDuplicateClick}
        />
      ) : (
        <EmptyState
          icon={<Globe className="w-12 h-12" />}
          title="Nenhum site encontrado"
          description={filters.search || filters.category || filters.status
            ? "Tente ajustar seus filtros para encontrar o que procura."
            : "Os sites cadastrados aqui aparecerão no hub principal para os usuários."}
          action={
            !filters.search && !filters.category && !filters.status ? (
              <Button variant="outline" leftIcon={<Plus className="w-4 h-4" />} onClick={handleAddNew}>
                Adicionar Site
              </Button>
            ) : (
              <Button variant="outline" onClick={clearFilters}>
                Limpar Filtros
              </Button>
            )
          }
        />
      )}

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Excluir Site"
        description={`Tem certeza que deseja excluir "${selectedSite?.name}"? Esta ação não pode ser desfeita.`}
        isLoading={isDeleting}
      />

      <DuplicateSiteDialog
        isOpen={isDuplicateDialogOpen}
        onClose={() => setIsDuplicateDialogOpen(false)}
        onConfirm={handleConfirmDuplicate}
        site={selectedSite}
        isLoading={isDuplicating}
      />
    </div>
  );
};

export default SitesPage;
