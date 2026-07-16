import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import {
  AppWindow,
  Globe,
  Users,
  Download,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  RefreshCw,
  LayoutGrid
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useDashboard } from '@/hooks/useDashboard';
import { cn } from '@/utils/cn';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { stats, loading, error } = useDashboard();

  const statCards = [
    { title: 'Total de Apps', value: stats?.apps, icon: AppWindow, color: 'bg-blue-500', change: '+4%', positive: true },
    { title: 'Sites Ativos', value: stats?.sites, icon: Globe, color: 'bg-emerald-500', change: '+2', positive: true },
    { title: 'Usuários', value: stats?.users?.toLocaleString(), icon: Users, color: 'bg-violet-500', change: '+12%', positive: true },
    { title: 'Downloads', value: stats?.downloads?.toLocaleString(), icon: Download, color: 'bg-amber-500', change: '-3%', positive: false },
  ];

  const recentActivities = [
    { id: 1, user: 'Admin João', action: 'Publicou nova versão', target: 'GL Hub App v2.1.0', time: 'Há 5 min' },
    { id: 2, user: 'Maria Silva', action: 'Adicionou novo site', target: 'Portal do Desenvolvedor', time: 'Há 25 min' },
    { id: 3, user: 'Sistema', action: 'Backup automático concluído', target: 'Banco de Dados', time: 'Há 2 horas' },
    { id: 4, user: 'Admin João', action: 'Removeu categoria', target: 'Jogos Antigos', time: 'Há 5 horas' },
  ];

  const handleRefresh = () => {
    window.location.reload();
  };

  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader title="Dashboard" />
        <ErrorState
          message={error}
          onRetry={handleRefresh}
        />
      </div>
    );
  }

  if (!loading && !stats) {
    return (
      <div className="space-y-6">
        <PageHeader title="Dashboard" />
        <EmptyState
          icon={<LayoutGrid className="h-12 w-12 text-gray-400" />}
          title="Nenhum dado disponível"
          description="As estatísticas do dashboard ainda não foram carregadas ou estão vazias."
          action={<Button onClick={handleRefresh}>Atualizar Dashboard</Button>}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Olá, ${user?.displayName?.split(' ')[0] || 'Administrador'}!`}
        subtitle="Aqui está o que está acontecendo no GL Hub hoje."
        action={
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="gap-2"
            disabled={loading}
          >
            <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
            Atualizar
          </Button>
        }
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <Card key={i} className="relative overflow-hidden group hover:shadow-lg transition-shadow">
            <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-10 ${stat.color} transition-transform group-hover:scale-110`} />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-24 mt-1" />
              ) : (
                <div className="text-2xl font-bold">{stat.value ?? '0'}</div>
              )}
              <p className="text-xs mt-1 flex items-center">
                {stat.positive ? (
                  <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span className={stat.positive ? 'text-emerald-500' : 'text-red-500'}>
                  {stat.change}
                </span>
                <span className="text-gray-400 ml-1">em relação ao mês passado</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Placeholder */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary-500" />
              Desempenho de Downloads
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-[300px] w-full rounded-xl" />
            ) : (
              <>
                <div className="h-[300px] w-full bg-gray-50 dark:bg-gray-800/50 rounded-xl flex items-end justify-between p-6 gap-2">
                  {[40, 70, 45, 90, 65, 80, 50, 60, 85, 45, 75, 95].map((h, i) => (
                    <div
                      key={i}
                      className="w-full bg-primary-500/20 dark:bg-primary-500/10 rounded-t-sm relative group"
                      style={{ height: `${h}%` }}
                    >
                      <div
                        className="absolute inset-0 bg-primary-500 rounded-t-sm transition-all duration-500 scale-y-0 origin-bottom group-hover:scale-y-100"
                        style={{ animation: `growUp 1s ease-out forwards ${i * 0.05}s` }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-4 px-2 text-xs text-gray-400">
                  <span>Jan</span>
                  <span>Mar</span>
                  <span>Mai</span>
                  <span>Jul</span>
                  <span>Set</span>
                  <span>Nov</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary-500" />
              Atividades Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex gap-4">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-3 w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="space-y-6">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex gap-4">
                      <div className="mt-1">
                        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          <Users className="h-4 w-4 text-gray-500" />
                        </div>
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {activity.user}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {activity.action} <span className="font-medium text-gray-900 dark:text-gray-100">{activity.target}</span>
                        </p>
                        <p className="text-xs text-gray-400">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 text-sm text-primary-600 dark:text-primary-400 font-medium hover:underline">
                  Ver todas as atividades
                </button>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <style>{`
        @keyframes growUp {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;


      <style>{`
        @keyframes growUp {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;
