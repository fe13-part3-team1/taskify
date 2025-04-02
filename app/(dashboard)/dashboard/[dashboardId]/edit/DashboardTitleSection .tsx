'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ROUTES from '@/constants/routes';
import Button from '@/components/common/Button';
import ColorPalette from '@/components/Dashboard/ColorPalette';
import { getDashboardDetail, updateDashboard } from './data';
import FormField from '@/components/compound/form/FormField';

const DASHBOARD_COLORS = ['#ffa500', '#7ac555', '#76a5ea', '#e876ea', '#760dde'];

export default function DashboardTitleSection({ dashboardId }: { dashboardId: number }) {
  const [isSelected, setIsSelected] = useState(DASHBOARD_COLORS[0]);
  const [dashboardTitle, setDashboardTitle] = useState('');

  const router = useRouter();

  const handleSelectColorClick = (color: string) => {
    setIsSelected(color);
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const dashboardData = await getDashboardDetail(dashboardId);
        setDashboardTitle(dashboardData.title);
        setIsSelected(dashboardData.color);
      } catch (error) {
        console.error('대시보드 정보 불러오기 실패:', error);
      }
    };

    fetchDashboard();
  }, [dashboardId]);

  const handleUpdateDashboard = async () => {
    const payload = {
      title: dashboardTitle,
      color: isSelected,
    };

    try {
      await updateDashboard(dashboardId, payload);
      router.push(ROUTES.DASHBOARD.root(dashboardId));
      router.refresh();
    } catch (error) {
      console.error('대시보드 수정 실패:', error);
    }
  };

  return (
    <div id="section" className="rounded-2xl bg-white px-[28px] py-[32px]">
      <h3 className="text-bold20 md:text-bold24 mb-6">대시보드 이름</h3>
      <FormField
        fieldType="input"
        label="대시보드 이름"
        id="title"
        name="title"
        value={dashboardTitle}
        placeholder="대시보드 이름을 입력해 주세요"
        onChange={(e) => setDashboardTitle(e.target.value)}
      />
      <div className="mt-4 mb-6 flex gap-2">
        <ColorPalette
          isSelected={isSelected}
          colors={DASHBOARD_COLORS}
          onColorSelect={handleSelectColorClick}
        />
      </div>
      <Button fullWidth size="modal" onClick={handleUpdateDashboard}>
        변경
      </Button>
    </div>
  );
}
