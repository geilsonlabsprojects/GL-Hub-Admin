import React, { useState, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Info,
  Settings,
  Image as ImageIcon,
  Eye,
  Save,
  Smartphone,
  Globe,
  Github,
  Zap,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { AppSchema, AppModel } from '@/models/appModel';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
import { ImageUploadField } from './ImageUploadField';
import { ScreenshotManager } from './ScreenshotManager';
import { cn } from '@/utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

interface AppFormProps {
  initialData?: Partial<AppModel>;
  onSubmit: (data: AppModel) => void;
  isLoading?: boolean;
}

type TabType = 'general' | 'technical' | 'media' | 'status';

export const AppForm: React.FC<AppFormProps> = ({
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
  } = useForm<AppModel>({
    resolver: zodResolver(AppSchema),
    defaultValues: {
      status: 'published',
      screenshots: [],
      featured: false,
      beta: false,
      downloads: 0,
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...initialData,
    },
  });

  const nameValue = useWatch({ control, name: 'name' });
  const appIdValue = useWatch({ control, name: 'appId' });
  const featuredValue = useWatch({ control, name: 'featured' });

  // Automatic appId generation
  useEffect(() => {
    if (nameValue && !appIdValue && !initialData?.appId) {
      const generatedId = 'com.glhub.' + nameValue
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]/g, '.');
      setValue('appId', generatedId);
    }
  }, [nameValue, appIdValue, setValue, initialData]);

  const tabs = [
    { id: 'general', label: 'Informações Gerais', icon: Info },
    { id: 'technical', label: 'Dados Técnicos', icon: Settings },
    { id: 'media', label: 'Mídia & Arquivos', icon: ImageIcon },
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
                        <label className={labelClasses}>Nome do Aplicativo</label>
                        <input {...register('name')} className={inputClasses} placeholder="Ex: GL Hub Admin" />
                        {errors.name && <span className={errorClasses}><AlertCircle className="h-3 w-3" /> {errors.name.message}</span>}
                      </div>

                      <div>
                        <label className={labelClasses}>ID do Pacote (App ID)</label>
                        <input {...register('appId')} className={inputClasses} placeholder="com.company.app" />
                        {errors.appId && <span className={errorClasses}>{errors.appId.message}</span>}
                      </div>

                      <div>
                        <label className={labelClasses}>Empresa / Desenvolvedor</label>
                        <input {...register('company')} className={inputClasses} placeholder="Ex: GL Development" />
                        {errors.company && <span className={errorClasses}>{errors.company.message}</span>}
                      </div>

                      <div>
                        <label className={labelClasses}>Categoria</label>
                        <select {...register('category')} className={inputClasses}>
                          <option value="">Selecione...</option>
                          <option value="Ferramentas">Ferramentas</option>
                          <option value="Produtividade">Produtividade</option>
                          <option value="Entretenimento">Entretenimento</option>
                          <option value="Comunicação">Comunicação</option>
                          <option value="Social">Social</option>
                        </select>
                        {errors.category && <span className={errorClasses}>{errors.category.message}</span>}
                      </div>

                      <div>
                        <label className={labelClasses}>Website (Opcional)</label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input {...register('website')} className={cn(inputClasses, "pl-10")} placeholder="https://..." />
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className={labelClasses}>Descrição Curta</label>
                        <input {...register('shortDescription')} className={inputClasses} placeholder="Resumo em uma frase..." />
                        {errors.shortDescription && <span className={errorClasses}>{errors.shortDescription.message}</span>}
                      </div>

                      <div className="md:col-span-2">
                        <label className={labelClasses}>Descrição Completa</label>
                        <textarea {...register('description')} rows={5} className={cn(inputClasses, "resize-none")} placeholder="Detalhes sobre o app..." />
                        {errors.description && <span className={errorClasses}>{errors.description.message}</span>}
                      </div>
                    </div>
                  )}

                  {activeTab === 'technical' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl md:col-span-2 flex items-center gap-3">
                        <Smartphone className="h-5 w-5 text-primary-500" />
                        <div>
                          <h4 className="text-sm font-semibold">Configurações de Build</h4>
                          <p className="text-xs text-gray-500">Dados técnicos referentes ao arquivo APK/AAB</p>
                        </div>
                      </div>

                      <div>
                        <label className={labelClasses}>Versão (Nome)</label>
                        <input {...register('versionName')} className={inputClasses} placeholder="1.0.0" />
                        {errors.versionName && <span className={errorClasses}>{errors.versionName.message}</span>}
                      </div>

                      <div>
                        <label className={labelClasses}>Versão (Código)</label>
                        <input type="number" {...register('versionCode', { valueAsNumber: true })} className={inputClasses} placeholder="1" />
                        {errors.versionCode && <span className={errorClasses}>{errors.versionCode.message}</span>}
                      </div>

                      <div>
                        <label className={labelClasses}>Tamanho do Arquivo</label>
                        <input {...register('size')} className={inputClasses} placeholder="Ex: 25 MB" />
                        {errors.size && <span className={errorClasses}>{errors.size.message}</span>}
                      </div>

                      <div>
                        <label className={labelClasses}>Arquitetura</label>
                        <input {...register('architecture')} className={inputClasses} placeholder="Ex: universal, arm64-v8a" />
                        {errors.architecture && <span className={errorClasses}>{errors.architecture.message}</span>}
                      </div>

                      <div>
                        <label className={labelClasses}>Mínimo SDK (Android)</label>
                        <input {...register('minSdk')} className={inputClasses} placeholder="Ex: 24 (Android 7.0)" />
                        {errors.minSdk && <span className={errorClasses}>{errors.minSdk.message}</span>}
                      </div>

                      <div>
                        <label className={labelClasses}>Alvo SDK (Android)</label>
                        <input {...register('targetSdk')} className={inputClasses} placeholder="Ex: 34 (Android 14)" />
                        {errors.targetSdk && <span className={errorClasses}>{errors.targetSdk.message}</span>}
                      </div>

                      <div className="md:col-span-2">
                        <label className={labelClasses}>Permissões Necessárias (Opcional)</label>
                        <textarea {...register('permissions')} rows={2} className={cn(inputClasses, "resize-none")} placeholder="Ex: INTERNET, STORAGE, CAMERA..." />
                      </div>

                      <div className="md:col-span-2">
                        <label className={labelClasses}>Repositório GitHub (Opcional)</label>
                        <div className="relative">
                          <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input {...register('githubRelease')} className={cn(inputClasses, "pl-10")} placeholder="user/repo" />
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'media' && (
                    <div className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ImageUploadField
                          label="Ícone do Aplicativo"
                          value={useWatch({ control, name: 'icon' })}
                          onChange={(url) => setValue('icon', url)}
                          onRemove={() => setValue('icon', '')}
                          helpText="Sugestão: 512x512px, PNG ou WebP."
                        />
                        <ImageUploadField
                          label="Banner / Imagem de Destaque"
                          value={useWatch({ control, name: 'banner' })}
                          onChange={(url) => setValue('banner', url)}
                          onRemove={() => setValue('banner', '')}
                          aspectRatio="video"
                          helpText="Sugestão: 1024x500px."
                        />
                      </div>

                      <ScreenshotManager
                        screenshots={useWatch({ control, name: 'screenshots' }) || []}
                        onChange={(urls) => setValue('screenshots', urls)}
                        onUpload={() => {}} // Integration logic
                      />

                      <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-2xl">
                        <label className={labelClasses}>URL de Download (APK)</label>
                        <input {...register('apkUrl')} className={inputClasses} placeholder="https://..." />
                        {errors.apkUrl && <span className={errorClasses}>{errors.apkUrl.message}</span>}
                      </div>
                    </div>
                  )}

                  {activeTab === 'status' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className={labelClasses}>Status de Publicação</label>
                          <select {...register('status')} className={inputClasses}>
                            <option value="published">Publicado</option>
                            <option value="beta">Beta (Testes)</option>
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
                                App em Destaque
                              </span>
                              <span className="text-xs text-gray-500">Exibir no carrossel da home page</span>
                            </div>
                          </label>

                          <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" {...register('beta')} className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                            <div className="flex flex-col">
                              <span className="text-sm font-semibold">Versão Beta</span>
                              <span className="text-xs text-gray-500">Marcar como versão de testes</span>
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
                             {useWatch({ control, name: 'icon' }) ? (
                               <img src={useWatch({ control, name: 'icon' })} className="w-full h-full object-cover rounded-2xl" />
                             ) : (
                               <Smartphone className="h-8 w-8 text-gray-300" />
                             )}
                           </div>
                           <div>
                             <h4 className="font-bold text-lg">{nameValue || 'Nome do App'}</h4>
                             <p className="text-sm text-gray-500 line-clamp-2 max-w-md">
                               {useWatch({ control, name: 'shortDescription' }) || 'Sua descrição aparecerá aqui...'}
                             </p>
                             <div className="mt-3 flex gap-2">
                               <span className="px-2 py-0.5 bg-white dark:bg-gray-800 rounded text-[10px] font-bold border border-gray-200 dark:border-gray-700">
                                 v{useWatch({ control, name: 'versionName' }) || '0.0.0'}
                               </span>
                               <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-[10px] font-bold">
                                 GRÁTIS
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
                          placeholder="Ex: open-source, utility, dark-mode"
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
          Salvar Aplicativo
        </Button>
      </div>
    </form>
  );
};
