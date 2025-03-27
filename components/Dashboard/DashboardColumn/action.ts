'use server';

import { api } from '@/lib/api';

export interface ColumnsType {
  id: number;
  title: string;
}

interface ColumnPromise {
  data: ColumnsType[];
}

// 카멜케이스
export default async function getDashboardColumn(dashboardId: number) {
  try {
    const response = await api.get<ColumnPromise>(`/columns?dashboardId=${dashboardId}`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}
