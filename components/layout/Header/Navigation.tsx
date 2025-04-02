'use client';
import Link from 'next/link';
import InvitationButton from '@/components/layout/Header/InvitationButton';
import Setting from '@/assets/icons/Setting';
import { useSelectedLayoutSegment } from 'next/navigation';

export default function Navigation({ dashboardId }: { dashboardId: number }) {
  const segment = useSelectedLayoutSegment();

  if (segment === 'edit') return null;

  return (
    <div className="flex gap-1.5 md:gap-3">
      <Link
        href={`/dashboard/${dashboardId}/edit`}
        className="text-medium14 text-gray500 border-gray300 flex items-center gap-2 truncate rounded-md border-1 px-3 py-1.5 md:rounded-lg md:px-4 md:py-2"
      >
        <Setting width={18} height={18} className="hidden md:block" />
        관리
      </Link>
      <InvitationButton dashboardId={dashboardId} />
    </div>
  );
}
