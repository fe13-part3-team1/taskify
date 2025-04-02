import { useEffect, useState } from 'react';
import { Dashboard } from '@/app/(dashboard)/mydashboard/types';
import { getMyDashboards } from '@/app/(dashboard)/mydashboard/data';

export function useSideNavDashboards(itemsPerPage: number) {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (itemsPerPage <= 0) return;

    async function fetchDashboards() {
      try {
        const response = await getMyDashboards();
        setDashboards(response.dashboards);
      } catch (err) {
        console.error('sidenav 목록 불러오기 에러:', err);
        setError(err as Error);
      }
    }

    fetchDashboards();
  }, [itemsPerPage]);

  return { dashboards, error };
}
