'use client';

import { useRouter } from 'next/navigation';
import { ModalProps } from '@/types/modalProps';
import Modal from '@/components/common/Modal';
import { deleteDashboard } from './data';
import ROUTES from '@/constants/routes';

interface DeleteDashboardModal extends ModalProps {
  dashboardId: number;
}

export default function DeleteDashboardModal({
  isOpen,
  onClose,
  dashboardId,
}: DeleteDashboardModal) {
  const router = useRouter();

  const handleClickDelete = async () => {
    await deleteDashboard(dashboardId).then(() => onClose());
    router.push(ROUTES.MY_DASHBOARD);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        padding="24/24"
        borderRadius="16"
        submitMessage="삭제"
        cancelMessage="취소"
        onSubmit={handleClickDelete}
      >
        <div className="text-medium16 sm:text-medium20 flex w-full justify-center">
          대시보드가 삭제됩니다.
        </div>
      </Modal>
    </>
  );
}
