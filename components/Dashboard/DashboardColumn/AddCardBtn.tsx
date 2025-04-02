'use client';

import Button from '@/components/common/Button';
import ToDoFormModal from '@/components/ToDoFormModal/ToDoFormModal';
import { useModal } from '@/hooks/useModal';
import Plus from '@/public/icons/plus.svg';

export default function AddCardBtn({
  columnId,
  getCards,
}: {
  columnId: number;
  getCards: (id?: number) => void;
}) {
  const { isOpen, open, close } = useModal();
  return (
    <>
      <ToDoFormModal isOpen={isOpen} onClose={close} columnId={columnId} getCards={getCards} />
      <Button onClick={open} fullWidth size="addTodo" variant="outline">
        <Plus />
      </Button>
    </>
  );
}
