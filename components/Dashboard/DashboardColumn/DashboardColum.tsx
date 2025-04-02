'use client';

import getDashboardCard from '../DashboardCard/action';
import AddCardBtn from './AddCardBtn';
import ColumnSettingList from './ColumnSettingList';
import { ColumnType } from '../type';
import {
  DndContext,
  DragEndEvent,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useEffect, useMemo, useState } from 'react';
import { CardType } from '../DashboardCard/DashboardCard';
import SortableCard from '../DashboardCard/SortableCard';
import { cardOrdersTable } from './db';

export default function DashboardColumn({ columnId, columnTitle }: ColumnType) {
  const [cards, setCards] = useState<CardType[]>([]);
  const [totalCounts, setTotalCounts] = useState(0);

  useEffect(() => {
    const getCards = async () => {
      try {
        const dbOrder = await cardOrdersTable.get(columnId);
        const data = await getDashboardCard(columnId);

        if (dbOrder) {
          const orderedCards = dbOrder.order
            .map((id: number) => data.cards.find((card) => card.id === id))
            .filter(Boolean) as CardType[];

          setCards(orderedCards);
        } else {
          setCards(data.cards);
        }

        setTotalCounts(data.totalCount);
      } catch (err) {
        console.error(err);
      }
    };

    getCards();
  }, [columnId]);

  const memoizedCards = useMemo(() => cards, [cards]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = memoizedCards.findIndex((card) => card.id === active.id);
    const newIndex = memoizedCards.findIndex((card) => card.id === over.id);

    if (oldIndex === -1 && newIndex === -1) return;

    const newCardsOrder = arrayMove(memoizedCards, oldIndex, newIndex);
    setCards(newCardsOrder);

    await cardOrdersTable.put({ columnId, order: newCardsOrder.map((c) => c.id) });
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  return (
    <div className="border-gray200 w-full shrink-0 border-b border-solid px-5 py-[18px] lg:w-[354px] lg:border-r lg:border-b-0">
      <div>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center justify-center gap-2">
            <div className="bg-violet h-2 w-2 rounded-full" />
            <h2 className="text-bold16 text-black">{columnTitle}</h2>
            <span className="bg-gray200 text-medium12 text-gray500 ml-1 flex items-center justify-center rounded-sm px-1.5 py-[3px]">
              {totalCounts}
            </span>
          </div>
          <ColumnSettingList columnId={columnId} columnTitle={columnTitle} />
        </div>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
          <SortableContext items={cards} strategy={verticalListSortingStrategy}>
            <div className="flex w-full flex-col gap-2 md:gap-4">
              <AddCardBtn columnId={columnId} />
              {cards.map((card) => (
                <SortableCard key={card.id} card={card} columnTitle={columnTitle} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
