import React, { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, AlertCircle, LayoutGrid, Info, Settings, Eye } from 'lucide-react';
import { CategorySchema, CategoryModel } from '@/models/categoryModel';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { ImageUploadField } from '@/components/apps/ImageUploadField';
import { cn } from '@/utils/cn';

interface CategoryFormProps {
  initialData?: Partial<CategoryModel>;
  onSubmit: (data: CategoryModel) => void;
  isLoading?: boolean;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData,
  onSubmit,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<CategoryModel>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      status: 'active',
      order: 0,
      ...initialData,
    },
  });

  const nameValue = useWatch({ control, name: 'name' });
  const slugValue = useWatch({ control, name: 'slug' });

  // Automatic slug generation
  useEffect(() => {
    if (nameValue && !slugValue && !initialData?.slug) {
      const generatedSlug = nameValue
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]/g, '-');
      setValue('slug', generatedSlug);
    }
  }, [nameValue, slugValue, setValue, initialData]);

  const inputClasses = "w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all";
  const labelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5";
  const errorClasses = "text-xs text-red-500 mt-1 flex items-center gap-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Basic Info */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4 text-primary-600 dark:text-primary-400">
                <Info className="h-5 w-5" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Informações Básicas</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className={labelClasses}>Nome da Categoria</label>
                  <input {...register('name')} className={inputClasses} placeholder="Ex: Jogos, Utilitários" />
                  {errors.name && <span className={errorClasses}><AlertCircle className="h-3 w-3" /> {errors.name.message}</span>}
                </div>

                <div>
                  <label className={labelClasses}>Slug (URL)</label>
                  <input {...register('slug')} className={inputClasses} placeholder="ex-categoria" />
                  {errors.slug && <span className={errorClasses}>{errors.slug.message}</span>}
                </div>

                <div>
                  <label className={labelClasses}>Cor de Destaque</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      {...register('color')}
                      className="h-10 w-20 p-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 cursor-pointer"
                    />
                    <input
                      type="text"
                      {...register('color')}
                      className={cn(inputClasses, "flex-1")}
                      placeholder="#000000"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className={labelClasses}>Descrição (Opcional)</label>
                  <textarea {...register('description')} rows={3} className={cn(inputClasses, "resize-none")} placeholder="Breve descrição da categoria..." />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4 text-primary-600 dark:text-primary-400">
                <LayoutGrid className="h-5 w-5" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Mídia</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ImageUploadField
                  label="Ícone"
                  value={useWatch({ control, name: 'iconUrl' })}
                  onChange={(url) => setValue('iconUrl', url)}
                  onRemove={() => setValue('iconUrl', '')}
                  helpText="SVG ou PNG transparente (512x512)"
                />
                <ImageUploadField
                  label="Banner / Capa (Opcional)"
                  value={useWatch({ control, name: 'imageUrl' })}
                  onChange={(url) => setValue('imageUrl', url)}
                  onRemove={() => setValue('imageUrl', '')}
                  aspectRatio="video"
                  helpText="Imagem de destaque para a categoria"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Status & Order */}
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4 text-primary-600 dark:text-primary-400">
                <Settings className="h-5 w-5" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Configurações</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={labelClasses}>Status</label>
                  <select {...register('status')} className={inputClasses}>
                    <option value="active">Ativa</option>
                    <option value="inactive">Inativa</option>
                  </select>
                </div>

                <div>
                  <label className={labelClasses}>Ordem de Exibição</label>
                  <input type="number" {...register('order', { valueAsNumber: true })} className={inputClasses} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4 text-primary-600 dark:text-primary-400">
                <Eye className="h-5 w-5" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Preview</h3>
              </div>

              <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800 flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center text-white"
                  style={{ backgroundColor: useWatch({ control, name: 'color' }) || '#ccc' }}
                >
                  {useWatch({ control, name: 'iconUrl' }) ? (
                    <img src={useWatch({ control, name: 'iconUrl' })} className="h-6 w-6 object-contain" alt="" />
                  ) : (
                    <LayoutGrid className="h-5 w-5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm truncate">{nameValue || 'Nome da Categoria'}</h4>
                  <p className="text-xs text-gray-500 truncate">/{slugValue || 'slug'}</p>
                </div>
                <div className={cn(
                  "h-2 w-2 rounded-full",
                  useWatch({ control, name: 'status' }) === 'active' ? "bg-green-500" : "bg-red-500"
                )} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-800">
        <Button variant="outline" type="button" disabled={isLoading}>
          Cancelar
        </Button>
        <Button
          type="submit"
          isLoading={isLoading}
          leftIcon={<Save className="h-4 w-4" />}
        >
          Salvar Categoria
        </Button>
      </div>
    </form>
  );
};
