import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { Star, Plus, ArrowUp, ArrowDown, Trash2, Smartphone, Globe, LayoutGrid, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Dialog } from '@/components/ui/Dialog';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Skeleton } from '@/components/ui/Skeleton';
import { useFeatured, useCreateFeatured, useUpdateFeaturedPriority, useDeleteFeatured } from '@/hooks/useFeatured';
import { useApps } from '@/hooks/useApps';
import { useSites } from '@/hooks/useSites';
import { useCategories } from '@/hooks/useCategories';
import { FeaturedModel } from '@/models';
import { useNotification } from '@/contexts/NotificationContext';
import { cn } from '@/utils/cn';

const FeaturedPage: React.FC = () => {
  const { showNotification } = useNotification();
  const { featuredItems, isLoading, totalCount } = useFeatured();
  const { mutate: createFeatured, isPending: isCreating } = useCreateFeatured();
  const { mutate: updatePriority } = useUpdateFeaturedPriority();
  const { mutate: deleteFeatured, isPending: isDeleting } = useDeleteFeatured();

  const { apps } = useApps();
  const { sites } = useSites();
  const { categories } = useCategories();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FeaturedModel | null>(null);

  const [newType, setNewType] = useState<'app' | 'site' | 'category'>('app');
  const [newId, setNewId] = useState('');

  const handleAdd = () => {
    if (!newId) {
      showNotification('Selecione um item', 'error');
      return;
    }

    createFeatured(
      { itemId: newId, type: newType, priority: totalCount, active: true },
      {
        onSuccess: () => {
          showNotification('Destaque adicionado!', 'success');
          setIsAddOpen(false);
          setNewId('');
        },
        onError: () => showNotification('Erro ao adicionar destaque.', 'error')
      }
    );
  };

  const handleMove = (item: FeaturedModel, direction: 'up' | 'down') => {
    const currentIndex = featuredItems.findIndex(i => i.id === item.id);
    if (direction === 'up' && currentIndex > 0) {
      const prevItem = featuredItems[currentIndex - 1];
      updatePriority({ id: item.id, priority: prevItem.priority });
      updatePriority({ id: prevItem.id, priority: item.priority });
    } else if (direction === 'down' && currentIndex < featuredItems.length - 1) {
      const nextItem = featuredItems[currentIndex + 1];
      updatePriority({ id: item.id, priority: nextItem.priority });
      updatePriority({ id: nextItem.id, priority: item.priority });
    }
  };

  const handleDelete = () => {
    if (selectedItem) {
      deleteFeatured(selectedItem.id, {
        onSuccess: () => {
          showNotification('Destaque removido', 'success');
          setIsDeleteDialogOpen(false);
        },
        onError: () => showNotification('Erro ao remover destaque.', 'error')
      });
    }
  };

  const getItemData = (item: FeaturedModel) => {
    switch (item.type) {
      case 'app':
        return apps.find(a => a.appId === item.itemId);
      case 'site':
        return sites.find(s => s.id === item.itemId);
      case 'category':
        return categories.find(c => c.id === item.itemId);
      default:
        return null;
    }
  };

  const renderItemIcon = (type: string) => {
    switch (type) {
      case 'app': return <Smartphone className="h-4 w-4" />;
      case 'site': return <Globe className="h-4 w-4" />;
      case 'category': return <LayoutGrid className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Destaques"
        subtitle="Gerencie itens em destaque na página inicial"
        action={
          <Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => setIsAddOpen(true)}>
            Adicionar Destaque
          </Button>
        }
      />

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-2xl" />
          ))}
        </div>
      ) : totalCount === 0 ? (
        <EmptyState
          icon={<Star className="w-12 h-12" />}
          title="Nenhum destaque"
          description="Adicione apps, sites ou categorias para aparecerem na seção de destaques."
          action={
            <Button variant="outline" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setIsAddOpen(true)}>
              Adicionar Destaque
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {featuredItems.map((item, index) => {
            const data = getItemData(item);
            return (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="flex flex-col gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      disabled={index === 0}
                      onClick={() => handleMove(item, 'up')}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      disabled={index === featuredItems.length - 1}
                      onClick={() => handleMove(item, 'down')}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="h-12 w-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center border border-gray-200 dark:border-gray-700 overflow-hidden">
                    {(data as any)?.icon || (data as any)?.iconUrl ? (
                      <img src={(data as any)?.icon || (data as any)?.iconUrl} className="h-full w-full object-cover" alt="" />
                    ) : renderItemIcon(item.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "text-[10px] font-bold uppercase px-1.5 py-0.5 rounded",
                        item.type === 'app' ? "bg-blue-100 text-blue-600" :
                        item.type === 'site' ? "bg-purple-100 text-purple-600" :
                        "bg-orange-100 text-orange-600"
                      )}>
                        {item.type}
                      </span>
                      <h4 className="font-bold truncate">{(data as any)?.name || 'Item não encontrado'}</h4>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{item.itemId}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => {
                        setSelectedItem(item);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Add Dialog */}
      <Dialog
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Novo Destaque"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Tipo de Item</label>
            <select
              className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl"
              value={newType}
              onChange={(e) => {
                setNewType(e.target.value as any);
                setNewId('');
              }}
            >
              <option value="app">Aplicativo</option>
              <option value="site">Site</option>
              <option value="category">Categoria</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Selecionar Item</label>
            <select
              className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl"
              value={newId}
              onChange={(e) => setNewId(e.target.value)}
            >
              <option value="">Selecione...</option>
              {newType === 'app' && apps.map(app => (
                <option key={app.appId} value={app.appId}>{app.name}</option>
              ))}
              {newType === 'site' && sites.map(site => (
                <option key={site.id} value={site.id}>{site.name}</option>
              ))}
              {newType === 'category' && categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancelar</Button>
            <Button onClick={handleAdd} isLoading={isCreating}>Adicionar</Button>
          </div>
        </div>
      </Dialog>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Remover Destaque"
        description="Tem certeza que deseja remover este item dos destaques?"
        confirmLabel="Remover"
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default FeaturedPage;
