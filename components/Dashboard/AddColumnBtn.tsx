'use client';

import { useModal } from '@/hooks/useModal';
import Button from '../common/Button';
import Plus from '@/public/icons/plus.svg';
import ColumnManagementModal from '../ColumnModal/ColumnManagementModal';

export default function AddColumnBtn() {
  const { isOpen, open, close } = useModal();

  return (
    <>
      <ColumnManagementModal isOpen={isOpen} onClose={close} option="create" />
      <Button size="addColumn" variant="outline" onClick={open}>
        <div className="text-bold18 text-black200 flex gap-3">
          <span className="hidden sm:block">새로운 칼럼 추가하기</span>
          <Plus />
        </div>
      </Button>
    </>
  );
}
