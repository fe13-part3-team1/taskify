'use client';

import { useRouter } from 'next/navigation';
import useDashboardParamsId from '@/components/Dashboard/useDashboardParamsId';
import ROUTES from '@/constants/routes';
import Button from '@/components/common/Button';
import BackLink from './BackLink';
import DashboardTitleSection from './DashboardTitleSection ';
import MemberListSection from './MemberListSection ';
import InvitationListSection from './InvitationListSection ';
import { deleteDashboard } from './data';

export default function DashboardIdEdit() {
  const { dashboardId } = useDashboardParamsId();
  const router = useRouter();

  const handleDelete = async () => {
    // 임시
    if (!confirm('정말로 이 대시보드를 삭제하시겠습니까?')) return;

    try {
      await deleteDashboard(dashboardId);
      router.push(ROUTES.MY_DASHBOARD);
    } catch {
      // 임시
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div id="wrapper" className="m-5 mb-[57px] flex flex-col gap-[34px]">
      <BackLink dashboardId={dashboardId} />

      {/* <div className="flex w-full max-w-[620px] flex-col gap-4"> */}
      <div className="mx-auto flex w-full lg:max-w-[620px] flex-col gap-4 px-4 lg:mx-0">
        <DashboardTitleSection dashboardId={dashboardId} />
        <MemberListSection dashboardId={dashboardId} />
        <InvitationListSection dashboardId={dashboardId} />

        <Button variant="outline" size="deleteDashboard" onClick={handleDelete}>
          대시보드 삭제하기
        </Button>
      </div>
    </div>
  );
}
