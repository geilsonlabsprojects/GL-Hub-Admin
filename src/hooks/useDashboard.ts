import { useState, useEffect } from 'react';
import { dashboardService, DashboardStats } from '@/services/dashboardService';

export const useDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    try {
      const unsubscribe = dashboardService.subscribeToStats((newStats) => {
        setStats(newStats);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar estatísticas do dashboard');
      setLoading(false);
    }
  }, []);

  return { stats, loading, error };
};
