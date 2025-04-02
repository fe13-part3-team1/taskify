'use server';

import { api } from '@/lib/api';
import { CardType } from './DashboardCard';

interface CardsPromise {
  cards: CardType[];
  totalCount: number;
}

export default async function getDashboardCard(id: number) {
  const response = await api.get<CardsPromise>(`/cards?columnId=${id}`);
  return response;
}
