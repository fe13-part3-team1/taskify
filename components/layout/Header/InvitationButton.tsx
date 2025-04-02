'use client';
import { inviteMember } from '@/app/(dashboard)/dashboard/[dashboardId]/edit/data';
import InviteModal from '@/app/(dashboard)/dashboard/[dashboardId]/edit/InviteModal';
import AddBoxIcon from '@/assets/icons/AddBoxIcon';
import { useModal } from '@/hooks/useModal';

export default function InvitationButton({ dashboardId }: { dashboardId: number }) {
  const { isOpen, open, close } = useModal();

  return (
    <>
      <button
        onClick={open}
        className="text-medium14 text-gray500 border-gray300 flex items-center gap-2 truncate rounded-md border-1 px-3 py-1.5 md:rounded-lg md:px-4 md:py-2"
      >
        <AddBoxIcon width="16" height="16" className="hidden md:block" />
        초대하기
      </button>
      <InviteModal
        isOpen={isOpen}
        onClose={close}
        onInvite={async (email) => {
          await inviteMember(dashboardId, email);
        }}
      />
    </>
  );
}
