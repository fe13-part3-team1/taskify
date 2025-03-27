import Modal from '../common/Modal';
import ToDoForm from './ToDoForm';

interface ToDoFormProps {
  open: boolean;
  onClose: () => void;
  cardId?: number;
}

const TO_DO_FORM_TYPE = {
  CREATE: '수정',
  UPDATE: '생성',
} as const;

export default function ToDoFormModal({ open, onClose, cardId }: ToDoFormProps) {
  // 변수명
  const CreateOrUpdate = cardId ? TO_DO_FORM_TYPE.UPDATE : TO_DO_FORM_TYPE.CREATE;
  return (
    <Modal
      onClose={onClose}
      isOpen={open}
      padding="32/32"
      borderRadius="16"
      cancelMessage="취소"
      submitMessage={CreateOrUpdate}
    >
      <div className="flex w-full flex-col gap-8">
        <h1 className="text-bold24 text-black200">할 일 {CreateOrUpdate}</h1>
        <ToDoForm cardId={cardId} />
      </div>
    </Modal>
  );
}
