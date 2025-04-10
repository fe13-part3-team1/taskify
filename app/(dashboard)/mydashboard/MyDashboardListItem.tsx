import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import DashboardColorIcon from '@/components/DashboardColorIcon/DashboardColorIcon';
import { Dashboard } from './types';

interface DashboardListItemProps extends Dashboard {
  dashboardId: number;
  isSelected?: boolean;
  shouldHideOnSm?: boolean;
}

export default function MyDashboardListItem({
  dashboardId,
  title,
  color,
  createdByMe,
  shouldHideOnSm = false,
}: DashboardListItemProps) {
  return (
    <Link
      href={`/dashboard/${dashboardId}`}
      className="border-gray300 h-[58px] w-full rounded-lg border bg-white md:h-[68px] lg:h-[70px]"
    >
      <div className="flex items-center gap-4 px-5 py-[17px] md:py-5 lg:py-[22px]">
        <DashboardColorIcon color={color} />

        <div
          className={clsx(
            'flex min-w-0 flex-1 items-center gap-[6px]',
            shouldHideOnSm ? 'hidden md:flex' : 'flex'
          )}
        >
          <span
            className={clsx(
              'text-semi14 md:text-semi16 truncate',
              createdByMe ? 'max-w-[calc(100%-14px)]' : 'flex-1'
            )}
          >
            {title}
          </span>
          {createdByMe && (
            <Image
              src="/icons/crown.svg"
              alt="내가 만든 대시보드"
              width={14}
              height={14}
              className="shrink-0"
            />
          )}
        </div>

        <Image src="/icons/arrowRight.svg" alt="대시보드로 이동" width={7} height={14} />
      </div>
    </Link>
  );
}
