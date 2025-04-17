'use server';

import { apiServer } from '@/lib/apiServer';

export interface ColumnsType {
  id: number;
  title: string;
}

interface ColumnPromise {
  data: ColumnsType[];
}

export default async function getDashboardColumn(dashboardId: number) {
  const response = await apiServer.get<ColumnPromise>(`/columns?dashboardId=${dashboardId}`);
  return response.data.data;
}
