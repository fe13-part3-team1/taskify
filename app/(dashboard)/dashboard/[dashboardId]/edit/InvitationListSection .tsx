'use client';

import Button from '@/components/common/Button';
import InviteModal from './InviteModal';
import { useMemo, useState } from 'react';
import { mockInvitations } from '@/mocks/invitations';
import AddBoxIcon from '@/assets/icons/AddBoxIcon';
import { api } from '@/lib/api';
import EXTERNAL_API from '@/constants/api/external';
import { useModal } from '@/hooks/useModal';

interface Props {
  dashboardId: string;
}

export default function InvitationListSection({ dashboardId }: Props) {
  const { isOpen, open, close } = useModal();
  const dashboardIdNum = Number(dashboardId);

  const invitees = useMemo(
    () =>
      mockInvitations.filter(
        (inv) => inv.dashboard.id === dashboardIdNum && inv.inviteAccepted === null
      ),
    [dashboardIdNum]
  );

  const [invitations, setInvitations] = useState(invitees);

  const cancelInvitation = async (id: number) => {
    console.log(`[임시] 초대 취소 요청: 초대 ID ${id}`);
    return Promise.resolve();
  };

  const handleCancel = async (id: number) => {
    try {
      await cancelInvitation(id);
      setInvitations((prev) => prev.filter((inv) => inv.id !== id));
    } catch (err) {
      console.error('초대 취소 실패:', err);
    }
  };

  return (
    <div id="section" className="rounded-2xl bg-white py-[32px]">
      <div className="mb-[27px] flex items-center justify-between px-[28px]">
        <h3 className="text-bold24">초대 내역</h3>
        <div className="flex items-center gap-4">
          <div>페이지네이션 버튼</div>
          <Button size="w-[109px] h-[32px] rounded-sm" className="flex gap-[10px]" onClick={open}>
            <AddBoxIcon width="14" height="14" color="white" />
            <span className="text-medium14">초대하기</span>
          </Button>
        </div>
      </div>

      <div className="w-full rounded-lg">
        <h4 className="text-gray400 text-regular16 px-[28px]">이메일</h4>
        {invitations.map((inv) => (
          <div key={inv.id} className="border-gray200 border-b">
            <div className="flex justify-between px-[28px] py-[16px]">
              <div className="flex items-center gap-[12px]">
                <span>{inv.invitee.email}</span>
              </div>
              <Button variant="ghost" size="delete" onClick={() => handleCancel(inv.id)}>
                취소
              </Button>
            </div>
          </div>
        ))}
      </div>

      <InviteModal
        isOpen={isOpen}
        onClose={close}
        onInvite={async (email) => {
          await api.post(EXTERNAL_API.DASHBOARDS.invite(dashboardIdNum), {
            email,
            dashboardIdNum,
          });
        }}
      />
    </div>
  );
}
