import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { Layout, Plus, ArrowUp, ArrowDown, Trash2, Edit2, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Dialog } from '@/components/ui/Dialog';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Skeleton } from '@/components/ui/Skeleton';
import { useHomeSlider, useCreateHomeSlide, useUpdateHomeSlide, useDeleteHomeSlide, useUpdateHomeSlideOrder } from '@/hooks/useHomeSlider';
import { HomeSlideModel } from '@/models';
import { HomeSliderForm } from './HomeSliderForm';
import { toast } from 'react-hot-toast';
import { cn } from '@/utils/cn';

const HomeSliderPage: React.FC = () => {
  const { slides, isLoading, totalCount } = useHomeSlider();
  const { mutate: createSlide, isPending: isCreating } = useCreateHomeSlide();
  const { mutate: updateSlide, isPending: isUpdating } = useUpdateHomeSlide();
  const { mutate: deleteSlide, isPending: isDeleting } = useDeleteHomeSlide();
  const { mutate: updateOrder } = useUpdateHomeSlideOrder();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState<HomeSlideModel | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleCreate = () => {
    setSelectedSlide(null);
    setIsFormOpen(true);
  };

  const handleEdit = (slide: HomeSlideModel) => {
    setSelectedSlide(slide);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (slide: HomeSlideModel) => {
    setSelectedSlide(slide);
    setIsDeleteDialogOpen(true);
  };

  const handleFormSubmit = (data: HomeSlideModel) => {
    if (selectedSlide) {
      updateSlide(
        { id: selectedSlide.id, data },
        {
          onSuccess: () => {
            toast.success('Slide atualizado!');
            setIsFormOpen(false);
          },
          onError: () => toast.error('Erro ao atualizar slide.')
        }
      );
    } else {
      createSlide(
        { data },
        {
          onSuccess: () => {
            toast.success('Slide criado!');
            setIsFormOpen(false);
          },
          onError: () => toast.error('Erro ao criar slide.')
        }
      );
    }
  };

  const handleMove = (slide: HomeSlideModel, direction: 'up' | 'down') => {
    const currentIndex = slides.findIndex(s => s.id === slide.id);
    if (direction === 'up' && currentIndex > 0) {
      const prevSlide = slides[currentIndex - 1];
      updateOrder({ id: slide.id, order: prevSlide.order });
      updateOrder({ id: prevSlide.id, order: slide.order });
    } else if (direction === 'down' && currentIndex < slides.length - 1) {
      const nextSlide = slides[currentIndex + 1];
      updateOrder({ id: slide.id, order: nextSlide.order });
      updateOrder({ id: nextSlide.id, order: slide.order });
    }
  };

  const handleConfirmDelete = () => {
    if (selectedSlide) {
      deleteSlide(selectedSlide.id, {
        onSuccess: () => {
          toast.success('Slide removido');
          setIsDeleteDialogOpen(false);
        }
      });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Carousel Inicial"
        subtitle="Gerencie os slides do banner principal"
        action={
          <Button leftIcon={<Plus className="w-4 h-4" />} onClick={handleCreate}>
            Novo Slide
          </Button>
        }
      />

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-2xl" />
          ))}
        </div>
      ) : totalCount === 0 ? (
        <EmptyState
          icon={<Layout className="w-12 h-12" />}
          title="Nenhum slide"
          description="Adicione slides para o carousel da página inicial."
          action={
            <Button variant="outline" leftIcon={<Plus className="w-4 h-4" />} onClick={handleCreate}>
              Adicionar Slide
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {slides.map((slide, index) => (
            <Card key={slide.id} className="overflow-hidden group">
              <CardContent className="p-0 flex h-32">
                <div className="flex flex-col border-r border-gray-100 dark:border-gray-800 p-2 justify-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    disabled={index === 0}
                    onClick={() => handleMove(slide, 'up')}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    disabled={index === slides.length - 1}
                    onClick={() => handleMove(slide, 'down')}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                </div>

                <div className="w-56 flex-shrink-0 relative overflow-hidden bg-gray-100">
                  <img src={slide.imageUrl} className="w-full h-full object-cover" alt={slide.title} />
                  {slide.status === 'inactive' && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-white uppercase bg-red-500 px-2 py-0.5 rounded">Inativo</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 p-4 min-w-0 flex flex-col justify-center">
                  <h4 className="font-bold text-lg truncate">{slide.title}</h4>
                  <p className="text-sm text-gray-500 line-clamp-2">{slide.description}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 uppercase">
                      {slide.type}
                    </span>
                    <span className="text-[10px] text-gray-400 truncate max-w-[200px]">{slide.linkUrl}</span>
                  </div>
                </div>

                <div className="p-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(slide)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => handleDeleteClick(slide)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Form Modal */}
      <Dialog
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={selectedSlide ? 'Editar Slide' : 'Novo Slide'}
        size="lg"
      >
        <HomeSliderForm
          initialData={selectedSlide || {}}
          onSubmit={handleFormSubmit}
          isLoading={isCreating || isUpdating}
        />
      </Dialog>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Remover Slide"
        description="Tem certeza que deseja remover este slide do carousel?"
        confirmLabel="Remover"
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default HomeSliderPage;
