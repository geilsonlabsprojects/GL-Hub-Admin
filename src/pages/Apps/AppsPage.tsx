import React, { useState, useMemo } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { AppWindow, Plus, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { AppList } from '@/components/apps/AppList';
import { AppFilters } from '@/components/apps/AppFilters';
import { AppForm } from '@/components/apps/AppForm';
import { Dialog } from '@/components/ui/Dialog';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { DuplicateAppDialog } from '@/components/apps/DuplicateAppDialog';
import { Skeleton } from '@/components/ui/Skeleton';
import { useApps } from '@/hooks/useApps';
import { useCreateApp } from '@/hooks/useCreateApp';
import { useUpdateApp } from '@/hooks/useUpdateApp';
import { useDeleteApp } from '@/hooks/useDeleteApp';
import { useDuplicateApp } from '@/hooks/useDuplicateApp';
import { AppModel } from '@/models';
import { useNotification } from '@/contexts/NotificationContext';

const AppsPage: React.FC = () => {
  // Hooks
  const {
    apps,
    isLoading,
    filters,
    setFilters,
    clearFilters,
    totalCount
  } = useApps();

  const { createApp, isLoading: isCreating } = useCreateApp();
  const { updateApp, isLoading: isUpdating } = useUpdateApp();
  const { deleteApp, isLoading: isDeleting } = useDeleteApp();
  const { duplicateApp, isLoading: isDuplicating } = useDuplicateApp();

  const { showNotification } = useNotification();

  // State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<AppModel | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDuplicateDialogOpen, setIsDuplicateDialogOpen] = useState(false);

  // Derived Data
  const categories = useMemo(() =>
    Array.from(new Set(apps.map(app => app.category).filter(Boolean))),
  [apps]);

  const companies = useMemo(() =>
    Array.from(new Set(apps.map(app => app.company).filter(Boolean))),
  [apps]);

  // Handlers
  const handleCreate = () => {
    setSelectedApp(null);
    setIsFormOpen(true);
  };

  const handleEdit = (app: AppModel) => {
    setSelectedApp(app);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (app: AppModel) => {
    setSelectedApp(app);
    setIsDeleteDialogOpen(true);
  };

  const handleDuplicateClick = (app: AppModel) => {
    setSelectedApp(app);
    setIsDuplicateDialogOpen(true);
  };

  const handleFormSubmit = (data: AppModel) => {
    if (selectedApp) {
      updateApp(
        { appId: selectedApp.appId, data },
        {
          onSuccess: () => {
            showNotification('Aplicativo atualizado com sucesso!', 'success');
            setIsFormOpen(false);
          },
          onError: () => {
            showNotification('Erro ao atualizar aplicativo.', 'error');
          }
        }
      );
    } else {
      createApp(data, {
        onSuccess: () => {
          showNotification('Aplicativo criado com sucesso!', 'success');
          setIsFormOpen(false);
        },
        onError: () => {
          showNotification('Erro ao criar aplicativo.', 'error');
        }
      });
    }
  };

  const handleConfirmDelete = () => {
    if (selectedApp) {
      deleteApp(selectedApp.appId, {
        onSuccess: () => {
          showNotification('Aplicativo excluído com sucesso!', 'success');
          setIsDeleteDialogOpen(false);
        },
        onError: () => {
          showNotification('Erro ao excluir aplicativo.', 'error');
        }
      });
    }
  };

  const handleConfirmDuplicate = (newAppId: string) => {
    if (selectedApp) {
      duplicateApp(
        { sourceAppId: selectedApp.appId, newAppId },
        {
          onSuccess: () => {
            showNotification('Aplicativo duplicado com sucesso!', 'success');
            setIsDuplicateDialogOpen(false);
          },
          onError: () => {
            showNotification('Erro ao duplicar aplicativo.', 'error');
          }
        }
      );
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          <Skeleton className="h-20 w-full rounded-2xl" />
          <div className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full border-b border-gray-100 dark:border-gray-800" />
            ))}
          </div>
        </div>
      );
    }

    if (totalCount === 0) {
      return (
        <EmptyState
          icon={<AppWindow className="w-12 h-12" />}
          title="Nenhum aplicativo encontrado"
          description="Comece adicionando seu primeiro aplicativo para que ele apareça aqui."
          action={
            <Button variant="outline" leftIcon={<Plus className="w-4 h-4" />} onClick={handleCreate}>
              Adicionar Aplicativo
            </Button>
          }
        />
      );
    }

    return (
      <div className="space-y-6">
        <AppFilters
          currentFilters={{
            search: filters.search || '',
            category: filters.category || '',
            status: filters.status || '',
            company: filters.company || '',
          }}
          onSearchChange={(search) => setFilters({ ...filters, search })}
          onCategoryChange={(category) => setFilters({ ...filters, category })}
          onStatusChange={(status) => setFilters({ ...filters, status: status as any })}
          onCompanyChange={(company) => setFilters({ ...filters, company })}
          onClearFilters={clearFilters}
          categories={categories}
          companies={companies}
        />

        <AppList
          apps={apps}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          onDuplicate={handleDuplicateClick}
          onView={(app) => window.open(`/apps/${app.appId}`, '_blank')}
        />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Aplicações"
        subtitle={`Gerencie ${totalCount} aplicativos no ecossistema GL Hub`}
        action={
          <Button leftIcon={<Plus className="w-4 h-4" />} onClick={handleCreate}>
            Novo App
          </Button>
        }
      />

      {renderContent()}

      {/* Form Modal */}
      <Dialog
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={selectedApp ? 'Editar Aplicativo' : 'Novo Aplicativo'}
        description={selectedApp ? `Editando ${selectedApp.name}` : 'Preencha os dados para cadastrar um novo app.'}
        size="xl"
      >
        <AppForm
          initialData={selectedApp || {}}
          onSubmit={handleFormSubmit}
          isLoading={isCreating || isUpdating}
        />
      </Dialog>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Excluir Aplicativo"
        description={`Tem certeza que deseja excluir "${selectedApp?.name}"? Esta ação não pode ser desfeita.`}
        confirmLabel="Excluir"
        variant="danger"
        isLoading={isDeleting}
      />

      {/* Duplicate Dialog */}
      <DuplicateAppDialog
        isOpen={isDuplicateDialogOpen}
        onClose={() => setIsDuplicateDialogOpen(false)}
        onConfirm={handleConfirmDuplicate}
        app={selectedApp}
        isLoading={isDuplicating}
      />
    </div>
  );
};

export default AppsPage;
