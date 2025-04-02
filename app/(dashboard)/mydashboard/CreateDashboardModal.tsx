import Modal from '@/components/common/Modal';
import FormField from '@/components/compound/form/FormField';
import ColorPalette from '@/components/Dashboard/ColorPalette';
import EXTERNAL_API from '@/constants/api/external';
import ROUTES from '@/constants/routes';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface CreateDashboardResponse {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

const DASHBOARD_COLORS = ['#ffa500', '#7ac555', '#76a5ea', '#e876ea', '#760dde'];

export default function CreateDashboardModal({ isOpen, onClose }: Props) {
  const [title, setTitle] = useState('');
  const [isColorSelected, setIsColorSelected] = useState<string | null>(null);
  const router = useRouter();

  const canSubmit = Boolean(title.trim() && isColorSelected);

  const resetForm = () => {
    setTitle('');
    setIsColorSelected(null);
  };

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const handleSubmitTitle = async () => {
    if (!canSubmit) return;

    try {
      const response = await api.post<CreateDashboardResponse>(`${EXTERNAL_API.DASHBOARDS.ROOT}`, {
        title,
        color: isColorSelected,
      });
      resetForm();

      const dashboardId = response.id;
      router.push(ROUTES.DASHBOARD.root(dashboardId));
      onClose();
    } catch (error) {
      console.error('대시보드 생성 실패:', error);
    }
  };

  const handleSelectColorClick = (color: string) => {
    setIsColorSelected(color);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmitTitle}
      submitMessage="생성"
      cancelMessage="취소"
      padding="32/32"
      borderRadius="16"
      disabled={!canSubmit}
    >
      <div className="w-full">
        <h3 className="text-bold20 md:text-bold24 mb-6">새로운 대시보드</h3>
        <FormField
          fieldType="input"
          label="대시보드 이름"
          id="title"
          name="title"
          value={title}
          placeholder="대시보드 이름을 입력해 주세요"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="mt-4 mb-6 flex gap-2">
          <ColorPalette
            isSelected={isColorSelected}
            colors={DASHBOARD_COLORS}
            onColorSelect={handleSelectColorClick}
          />
        </div>
      </div>
    </Modal>
  );
}
