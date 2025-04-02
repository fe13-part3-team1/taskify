import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import EXTERNAL_API from '@/constants/api/external';
import { ModalProps } from '@/types/modalProps';
import Modal from '../common/Modal';
import FormField from '../compound/form/FormField';
import useDashboardParamsId from '../Dashboard/useDashboardParamsId';
import getDashboardColumn, { ColumnsType } from '../Dashboard/DashboardColumn/action';

const COLUMN_NAME_ERROR_MESSAGE = {
  ALREADY_EXISTS: '중복된 컬럼 이름입니다',
  MAX_COLUMNS_REACHED: '컬럼은 10개까지 가능합니다',
  EQUAL_TITLE: '기존 칼럼과 동일한 이름입니다',
};

interface ColumnManagementProps extends ModalProps {
  columnId?: number;
  columnTitle?: string;
}

export default function ColumnManagementModal({
  isOpen,
  onClose,
  columnId,
  columnTitle,
}: ColumnManagementProps) {
  const [columnName, setColumnName] = useState(columnTitle ?? '');
  const [dashboardColumns, setDashboardColumns] = useState<ColumnsType[]>([]);
  const [columnErrorMessage, setColumnErrorMessage] = useState('');
  const { dashboardId } = useDashboardParamsId();

  const hasColumnName = columnName.trim();
  const isCheckedSameColumnName = dashboardColumns.some((column) => column.title === columnName);
  const isMaxColumnList = dashboardColumns.length === 10;
  const isEqualTitle = columnTitle === columnName;
  const createOrUpdate = columnId ? '변경' : '생성';

  useEffect(() => {
    const getColumn = async () => {
      const data = await getDashboardColumn(dashboardId);
      if (data) setDashboardColumns(data);
    };
    getColumn();
  }, [dashboardId]);

  const handleColumnSubmit = async () => {
    if (!columnName.trim()) return;
    if (columnId && isEqualTitle)
      return setColumnErrorMessage(COLUMN_NAME_ERROR_MESSAGE.EQUAL_TITLE);
    if (isCheckedSameColumnName)
      return setColumnErrorMessage(COLUMN_NAME_ERROR_MESSAGE.ALREADY_EXISTS);
    if (!columnId && isMaxColumnList)
      return setColumnErrorMessage(COLUMN_NAME_ERROR_MESSAGE.MAX_COLUMNS_REACHED);

    try {
      await api[columnId ? 'put' : 'post'](
        `${EXTERNAL_API.COLUMNS.ROOT}${columnId ? `/${columnId}` : ''}`,
        {
          title: columnName,
          ...(!columnId && { dashboardId }),
        }
      );
      onClose();
      window.location.reload();
    } catch (err) {
      console.error(err);
      setColumnErrorMessage('다시 시도해 주세요');
    }
  };

  const handleColumnNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColumnErrorMessage('');
    setColumnName(e.target.value);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      submitMessage={createOrUpdate}
      cancelMessage="취소"
      padding="24/24"
      borderRadius="8"
      onSubmit={handleColumnSubmit}
      disabled={!hasColumnName}
    >
      <div className="flex w-full flex-col gap-6">
        <h1 className="text-bold24 text-black200">새 컬럼 생성</h1>
        <FormField
          fieldType="input"
          label="이름"
          placeholder="컬럼 이름을 입력해 주세요"
          value={columnName}
          onChange={handleColumnNameChange}
          isValid={columnErrorMessage === ''}
          errorMessage={columnErrorMessage}
        />
      </div>
    </Modal>
  );
}
