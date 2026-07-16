import React, { useState, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Info,
  Image as ImageIcon,
  Eye,
  Save,
  Globe,
  Zap,
  AlertCircle,
  Link as LinkIcon
} from 'lucide-react';
import { SiteSchema, SiteModel } from '@/models/siteModel';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
import { ImageUploadField } from '../apps/ImageUploadField';
import { ScreenshotManager } from '../apps/ScreenshotManager';
import { cn } from '@/utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

interface SiteFormProps {
  initialData?: Partial<SiteModel>;
  onSubmit: (data: SiteModel) => void;
  isLoading?: boolean;
}

type TabType = 'general' | 'media' | 'status';

export const SiteForm: React.FC<SiteFormProps> = ({
  initialData,
  onSubmit,
  isLoading,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('general');

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<SiteModel>({
    resolver: zodResolver(SiteSchema),
    defaultValues: {
      status: 'published',
      screenshots: [],
      featured: false,
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...initialData,
    },
  });

  const nameValue = useWatch({ control, name: 'name' });
  const siteIdValue = useWatch({ control, name: 'siteId' });
  const featuredValue = useWatch({ control, name: 'featured' });

  // Automatic siteId generation from name
  useEffect(() => {
    if (nameValue && !siteIdValue && !initialData?.siteId) {
      const generatedId = nameValue
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]/g, '-');
      setValue('siteId', generatedId);
    }
  }, [nameValue, siteIdValue, setValue, initialData]);

  const tabs = [
    { id: 'general', label: 'Informações Gerais', icon: Info },
    { id: 'media', label: 'Mídia & Links', icon: ImageIcon },
    { id: 'status', label: 'Status & Visibilidade', icon: Eye },
  ];

  const inputClasses = "w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all";
  const labelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5";
  const errorClasses = "text-xs text-red-500 mt-1 flex items-center gap-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:w-64 flex flex-row lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as TabType)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap",
                  activeTab === tab.id
                    ? "bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400"
                    : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                )}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <Card>
            <CardContent className="pt-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'general' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className={labelClasses}>Nome do Site</label>
                        <input {...register('name')} className={inputClasses} placeholder="Ex: GL Hub" />
                        {errors.name && <span className={errorClasses}><AlertCircle className="h-3 w-3" /> {errors.name.message}</span>}
                      </div>

                      <div>
                        <label className={labelClasses}>ID do Site (Slug)</label>
                        <input
                          {...register('siteId')}
                          className={cn(inputClasses, !!initialData?.siteId && "bg-gray-100 cursor-not-allowed")}
                          placeholder="gl-hub"
                          disabled={!!initialData?.siteId}
                        />
                        {errors.siteId && <span className={errorClasses}>{errors.siteId.message}</span>}
                      </div>

                      <div>
                        <label className={labelClasses}>Categoria</label>
                        <select {...register('categoryId')} className={inputClasses}>
                          <option value="">Selecione...</option>
                          <option value="Serviços">Serviços</option>
                          <option value="Notícias">Notícias</option>
                          <option value="Entretenimento">Entretenimento</option>
                          <option value="Utilitários">Utilitários</option>
                          <option value="Outros">Outros</option>
                        </select>
                        {errors.categoryId && <span className={errorClasses}>{errors.categoryId.message}</span>}
                      </div>

                      <div className="md:col-span-2">
                        <label className={labelClasses}>URL do Site</label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input {...register('url')} className={cn(inputClasses, "pl-10")} placeholder="https://..." />
                        </div>
                        {errors.url && <span className={errorClasses}>{errors.url.message}</span>}
                      </div>

                      <div className="md:col-span-2">
                        <label className={labelClasses}>Descrição Curta</label>
                        <input {...register('shortDescription')} className={inputClasses} placeholder="Resumo em uma frase..." />
                        {errors.shortDescription && <span className={errorClasses}>{errors.shortDescription.message}</span>}
                      </div>

                      <div className="md:col-span-2">
                        <label className={labelClasses}>Descrição Completa</label>
                        <textarea {...register('description')} rows={5} className={cn(inputClasses, "resize-none")} placeholder="Detalhes sobre o site..." />
                        {errors.description && <span className={errorClasses}>{errors.description.message}</span>}
                      </div>
                    </div>
                  )}

                  {activeTab === 'media' && (
                    <div className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                          <ImageUploadField
                            label="Ícone do Site"
                            value={useWatch({ control, name: 'iconUrl' })}
                            onChange={(url) => setValue('iconUrl', url)}
                            onRemove={() => setValue('iconUrl', '')}
                            helpText="Sugestão: 512x512px, PNG ou WebP."
                          />
                          {errors.iconUrl && <span className={errorClasses}><AlertCircle className="h-3 w-3" /> {errors.iconUrl.message}</span>}
                        </div>
                        <div className="space-y-1">
                          <ImageUploadField
                            label="Banner do Site"
                            value={useWatch({ control, name: 'bannerUrl' })}
                            onChange={(url) => setValue('bannerUrl', url)}
                            onRemove={() => setValue('bannerUrl', '')}
                            aspectRatio="video"
                            helpText="Sugestão: 1024x500px."
                          />
                          {errors.bannerUrl && <span className={errorClasses}><AlertCircle className="h-3 w-3" /> {errors.bannerUrl.message}</span>}
                        </div>
                      </div>

                      <ScreenshotManager
                        screenshots={useWatch({ control, name: 'screenshots' }) || []}
                        onChange={(urls) => setValue('screenshots', urls)}
                        onUpload={() => {}} // Integration logic
                      />
                    </div>
                  )}

                  {activeTab === 'status' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className={labelClasses}>Status de Publicação</label>
                          <select {...register('status')} className={inputClasses}>
                            <option value="published">Publicado</option>
                            <option value="hidden">Oculto</option>
                            <option value="maintenance">Manutenção</option>
                            <option value="archived">Arquivado</option>
                          </select>
                        </div>

                        <div className="flex flex-col justify-end gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" {...register('featured')} className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                            <div className="flex flex-col">
                              <span className="text-sm font-semibold flex items-center gap-1.5">
                                <Zap className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                                Site em Destaque
                              </span>
                              <span className="text-xs text-gray-500">Exibir na seção de destaques</span>
                            </div>
                          </label>
                        </div>
                      </div>

                      <div className="p-6 border-2 border-primary-100 dark:border-primary-900/30 rounded-3xl bg-primary-50/30 dark:bg-primary-900/10 relative overflow-hidden">
                         {featuredValue && (
                           <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                             Preview: Destaque
                           </div>
                         )}
                         <div className="flex items-start gap-4">
                           <div className="h-16 w-16 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center">
                             {useWatch({ control, name: 'iconUrl' }) ? (
                               <img src={useWatch({ control, name: 'iconUrl' })} className="w-full h-full object-cover rounded-2xl" />
                             ) : (
                               <Globe className="h-8 w-8 text-gray-300" />
                             )}
                           </div>
                           <div className="flex-1">
                             <h4 className="font-bold text-lg">{nameValue || 'Nome do Site'}</h4>
                             <p className="text-sm text-gray-500 line-clamp-2 max-w-md">
                               {useWatch({ control, name: 'shortDescription' }) || 'A descrição do site aparecerá aqui...'}
                             </p>
                             <div className="mt-3 flex items-center gap-2">
                               <LinkIcon className="h-3 w-3 text-gray-400" />
                               <span className="text-xs text-primary-600 font-medium truncate max-w-[250px]">
                                 {useWatch({ control, name: 'url' }) || 'https://exemplo.com'}
                               </span>
                             </div>
                           </div>
                         </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className={labelClasses}>Tags (Separadas por vírgula)</label>
                        <input
                          type="text"
                          className={inputClasses}
                          placeholder="Ex: web, tool, portal"
                          defaultValue={initialData?.tags?.join(', ')}
                          onChange={(e) => {
                            const tags = e.target.value.split(',').map(t => t.trim()).filter(Boolean);
                            setValue('tags', tags);
                          }}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className={labelClasses}>Observações Internas (Opcional)</label>
                        <textarea {...register('observations')} rows={3} className={cn(inputClasses, "resize-none")} placeholder="Notas privadas apenas para administradores..." />
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-800">
        <Button variant="outline" type="button" disabled={isLoading}>
          Descartar Alterações
        </Button>
        <Button
          type="submit"
          isLoading={isLoading}
          leftIcon={<Save className="h-4 w-4" />}
        >
          Salvar Site
        </Button>
      </div>
    </form>
  );
};
