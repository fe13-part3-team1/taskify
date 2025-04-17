import { ModalProps } from '@/types/modalProps';
import EXTERNAL_API from '@/constants/api/external';
import Modal from '../common/Modal';
import { apiClient } from '@/lib/apiClient';

interface DeleteColumnProps extends ModalProps {
  columnId: number;
}

export default function DeleteColumnModal({ isOpen, onClose, columnId }: DeleteColumnProps) {
  const handelColumnDelete = async () => {
    await apiClient.delete(`${EXTERNAL_API.COLUMNS.ROOT}/${columnId}`).then(() => onClose());
    window.location.reload();
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
        onSubmit={handelColumnDelete}
      >
        <div className="text-medium16 sm:text-medium20 flex w-full justify-center">
          컬럼의 모든 카드가 삭제됩니다.
        </div>
      </Modal>
    </>
  );
}
