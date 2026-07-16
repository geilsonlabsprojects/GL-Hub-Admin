import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Settings, Save } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Configurações"
        subtitle="Ajustes globais do ecossistema GL Hub"
        action={
          <Button leftIcon={<Save className="w-4 h-4" />}>
            Salvar Alterações
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Geral
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border border-gray-100 dark:border-gray-800 rounded-xl bg-gray-50/50 dark:bg-gray-800/20">
              <p className="text-sm font-medium">Manutenção do Sistema</p>
              <p className="text-xs text-gray-500 mt-1">Coloque o hub em modo de manutenção para todos os usuários.</p>
            </div>
            <div className="p-4 border border-gray-100 dark:border-gray-800 rounded-xl bg-gray-50/50 dark:bg-gray-800/20">
              <p className="text-sm font-medium">Notificações Push</p>
              <p className="text-xs text-gray-500 mt-1">Habilite ou desabilite o envio de notificações globais.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Aparência</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">Configurações de tema e marca em breve.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
