'use client';

import { useCallback, useEffect, useState } from 'react';
import { useModal } from '@/hooks/useModal';
import AddBoxIcon from '@/assets/icons/AddBoxIcon';
import Button from '@/components/common/Button';
import { usePagination } from '@/components/Pagination/usePagination';
import PaginationItems from '@/components/Pagination/PaginationItems';
import PaginationControls from '@/components/Pagination/PaginationControls';
import InviteModal from './InviteModal';
import { Invitation } from '@/app/(dashboard)/mydashboard/types';
import { cancelInvitation, getDashboardInvitations, inviteMember } from './data';

export default function InvitationListSection({ dashboardId }: { dashboardId: number }) {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const { isOpen, open, close } = useModal();
  const itemsPerPage = 5;

  const { currentPage, totalPages, goToPrev, goToNext } = usePagination(invitations, itemsPerPage);

  const fetchInvitations = useCallback(async () => {
    const data = await getDashboardInvitations(dashboardId);
    const pending = data.invitations.filter((inv) => inv.inviteAccepted === null);
    setInvitations(pending);
  }, [dashboardId]);

  useEffect(() => {
    fetchInvitations();
  }, [fetchInvitations]);

  const handleCancel = async (invitationId: number) => {
    try {
      await cancelInvitation(dashboardId, invitationId);
      setInvitations((prev) => prev.filter((inv) => inv.id !== invitationId));
    } catch (err) {
      console.error('초대 취소 실패:', err);
    }
  };

  return (
    <div id="section" className="rounded-2xl bg-white py-[32px]">
      <div className="mb-[14px] md:mb-[32px] flex items-center justify-between px-[28px]">
        <h3 className="text-bold20 md:text-bold24">초대 내역</h3>
        <div className="flex items-center gap-4">
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            goToPrev={goToPrev}
            goToNext={goToNext}
          />
          <Button size="w-[109px] h-[32px] rounded-sm" className="flex gap-[10px]" onClick={open}>
            <AddBoxIcon width="14" height="14" color="white" />
            <span className="text-medium12 md:text-medium14">초대하기</span>
          </Button>
        </div>
      </div>

      <div className="w-full rounded-lg">
        <h4 className="text-gray400 text-regular14 md:text-regular16 px-[28px]">이메일</h4>

        <PaginationItems
          data={invitations}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          renderItems={(pageItems) => (
            <>
              {pageItems.map((item) => (
                <div key={item.id} className="border-gray200 border-b">
                  <div className="flex justify-between px-[28px] py-[16px]">
                    <div className="flex items-center gap-[12px]">
                      <span>{item.invitee.email}</span>
                    </div>
                    <Button variant="ghost" size="delete" onClick={() => handleCancel(item.id)}>
                      취소
                    </Button>
                  </div>
                </div>
              ))}
            </>
          )}
        />
      </div>

      <InviteModal
        isOpen={isOpen}
        onClose={close}
        onInvite={async (email) => {
          await inviteMember(dashboardId, email);
        }}
        onSuccess={() => fetchInvitations()}
      />
    </div>
  );
}
