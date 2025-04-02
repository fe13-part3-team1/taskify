'use client';

import { useState } from 'react';
import useDashboardParamsId from '@/components/Dashboard/useDashboardParamsId';
import Button from '@/components/common/Button';
import BackLink from './BackLink';
import DashboardTitleSection from './DashboardTitleSection ';
import MemberListSection from './MemberListSection ';
import InvitationListSection from './InvitationListSection ';
import DeleteDashboardModal from './DeleteDashboardModal';

export default function DashboardIdEdit() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { dashboardId } = useDashboardParamsId();

  const handleClickDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div id="wrapper" className="m-5 mb-[57px] flex flex-col gap-[34px]">
      <BackLink dashboardId={dashboardId} />

      <div className="mx-auto flex w-full flex-col gap-4 px-4 lg:mx-0 lg:max-w-[620px]">
        <DashboardTitleSection dashboardId={dashboardId} />
        <MemberListSection dashboardId={dashboardId} />
        <InvitationListSection dashboardId={dashboardId} />

        <Button variant="outline" size="deleteDashboard" onClick={handleClickDelete}>
          대시보드 삭제하기
        </Button>
      </div>

      <DeleteDashboardModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModal}
        dashboardId={dashboardId}
      />
    </div>
  );
}
