import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, AlertCircle, Image as ImageIcon, Link, Calendar, Settings } from 'lucide-react';
import { BannerSchema, BannerModel } from '@/models/bannerModel';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { ImageUploadField } from '@/components/apps/ImageUploadField';
import { cn } from '@/utils/cn';

interface BannerFormProps {
  initialData?: Partial<BannerModel>;
  onSubmit: (data: BannerModel) => void;
  isLoading?: boolean;
}

export const BannerForm: React.FC<BannerFormProps> = ({
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
  } = useForm<BannerModel>({
    resolver: zodResolver(BannerSchema),
    defaultValues: {
      status: 'active',
      type: 'internal',
      order: 0,
      ...initialData,
    },
  });

  const inputClasses = "w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all";
  const labelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5";
  const errorClasses = "text-xs text-red-500 mt-1 flex items-center gap-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4 text-primary-600 dark:text-primary-400">
                <ImageIcon className="h-5 w-5" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Conteúdo do Banner</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={labelClasses}>Título do Banner</label>
                  <input {...register('title')} className={inputClasses} placeholder="Ex: Promoção de Verão" />
                  {errors.title && <span className={errorClasses}><AlertCircle className="h-3 w-3" /> {errors.title.message}</span>}
                </div>

                <div>
                  <label className={labelClasses}>Descrição (Opcional)</label>
                  <textarea {...register('description')} rows={2} className={cn(inputClasses, "resize-none")} placeholder="Breve texto sobre o banner..." />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClasses}>Tipo de Link</label>
                    <select {...register('type')} className={inputClasses}>
                      <option value="internal">Interno (App/Site)</option>
                      <option value="external">Externo (URL)</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClasses}>URL do Link</label>
                    <div className="relative">
                      <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input {...register('linkUrl')} className={cn(inputClasses, "pl-10")} placeholder="https://... ou glhub://..." />
                    </div>
                  </div>
                </div>

                <ImageUploadField
                  label="Imagem do Banner"
                  value={useWatch({ control, name: 'imageUrl' })}
                  onChange={(url) => setValue('imageUrl', url)}
                  onRemove={() => setValue('imageUrl', '')}
                  aspectRatio="video"
                  helpText="Tamanho recomendado: 1200x600px"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4 text-primary-600 dark:text-primary-400">
                <Calendar className="h-5 w-5" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Agendamento</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses}>Data de Início (Opcional)</label>
                  <input type="date" {...register('startDate', { valueAsDate: true })} className={inputClasses} />
                </div>
                <div>
                  <label className={labelClasses}>Data de Término (Opcional)</label>
                  <input type="date" {...register('endDate', { valueAsDate: true })} className={inputClasses} />
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-500">Se deixado em branco, o banner será exibido por tempo indeterminado.</p>
            </CardContent>
          </Card>
        </div>

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
                    <option value="active">Ativo</option>
                    <option value="inactive">Inativo</option>
                  </select>
                </div>

                <div>
                  <label className={labelClasses}>Ordem</label>
                  <input type="number" {...register('order', { valueAsNumber: true })} className={inputClasses} />
                </div>

                <div>
                  <label className={labelClasses}>Cor do Botão (Opcional)</label>
                  <input type="color" {...register('color')} className="h-10 w-full p-1 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 cursor-pointer" />
                </div>

                <div>
                  <label className={labelClasses}>Texto do Botão (Opcional)</label>
                  <input {...register('buttonLabel')} className={inputClasses} placeholder="Saiba mais" />
                </div>
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
          Salvar Banner
        </Button>
      </div>
    </form>
  );
};
