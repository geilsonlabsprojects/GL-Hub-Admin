import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, AlertCircle, Image as ImageIcon, Link, Settings } from 'lucide-react';
import { HomeSlideSchema, HomeSlideModel } from '@/models/homeSlideModel';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { ImageUploadField } from '@/components/apps/ImageUploadField';
import { cn } from '@/utils/cn';

interface HomeSliderFormProps {
  initialData?: Partial<HomeSlideModel>;
  onSubmit: (data: HomeSlideModel) => void;
  isLoading?: boolean;
}

export const HomeSliderForm: React.FC<HomeSliderFormProps> = ({
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
  } = useForm<HomeSlideModel>({
    resolver: zodResolver(HomeSlideSchema),
    defaultValues: {
      status: 'active',
      type: 'external',
      order: 0,
      ...initialData,
    },
  });

  const inputClasses = "w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all";
  const labelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5";
  const errorClasses = "text-xs text-red-500 mt-1 flex items-center gap-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <label className={labelClasses}>Título do Slide</label>
                  <input {...register('title')} className={inputClasses} placeholder="Ex: Confira os Novos Apps" />
                  {errors.title && <span className={errorClasses}><AlertCircle className="h-3 w-3" /> {errors.title.message}</span>}
                </div>

                <div>
                  <label className={labelClasses}>Descrição (Opcional)</label>
                  <textarea {...register('description')} rows={3} className={cn(inputClasses, "resize-none")} placeholder="Breve texto sobre o slide..." />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClasses}>Tipo</label>
                    <select {...register('type')} className={inputClasses}>
                      <option value="app">App</option>
                      <option value="site">Site</option>
                      <option value="category">Categoria</option>
                      <option value="external">Externo</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClasses}>Status</label>
                    <select {...register('status')} className={inputClasses}>
                      <option value="active">Ativo</option>
                      <option value="inactive">Inativo</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClasses}>URL do Link</label>
                  <div className="relative">
                    <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input {...register('linkUrl')} className={cn(inputClasses, "pl-10")} placeholder="URL de destino..." />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <ImageUploadField
                label="Imagem do Slide"
                value={useWatch({ control, name: 'imageUrl' })}
                onChange={(url) => setValue('imageUrl', url)}
                onRemove={() => setValue('imageUrl', '')}
                aspectRatio="video"
                helpText="Tamanho recomendado: 1920x1080px (ou proporcional)"
              />
              {errors.imageUrl && <span className={errorClasses}>{errors.imageUrl.message}</span>}

              <div className="mt-6">
                <label className={labelClasses}>Ordem</label>
                <input type="number" {...register('order', { valueAsNumber: true })} className={inputClasses} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-800">
        <Button variant="outline" type="button" onClick={() => {}} disabled={isLoading}>
          Cancelar
        </Button>
        <Button
          type="submit"
          isLoading={isLoading}
          leftIcon={<Save className="h-4 w-4" />}
        >
          Salvar Slide
        </Button>
      </div>
    </form>
  );
};
