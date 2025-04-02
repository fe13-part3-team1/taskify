import { useParams } from 'next/navigation';

export default function useDashboardParamsId() {
  const params = useParams<{ dashboardId: string }>();
  const dashboardId = Number(params.dashboardId);

  return { dashboardId };
}
