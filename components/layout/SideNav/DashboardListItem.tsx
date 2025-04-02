import Link from 'next/link';
import Image from 'next/image';
import DashboardColorIcon from '../../DashboardColorIcon/DashboardColorIcon';
import clsx from 'clsx';
import { Dashboard } from '@/app/(dashboard)/mydashboard/types';

interface DashboardListItemProps extends Dashboard {
  dashboardId: number;
  isSelected?: boolean;
}

export default function DashboardListItem({
  dashboardId,
  title,
  color,
  createdByMe,
  isSelected,
}: DashboardListItemProps) {
  return (
    <li className={clsx('rounded-sm', isSelected ? 'bg-violet8' : 'hover:bg-gray100')}>
      <Link
        href={`/dashboard/${dashboardId}`}
        className="flex h-[50px] items-center justify-center gap-4 px-3 py-2 md:justify-start"
      >
        <DashboardColorIcon color={color} />
        <div className="flex hidden min-w-0 items-center gap-[6px] md:flex">
          <span
            className={clsx(
              'text-medium18 text-gray500 truncate',
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
      </Link>
    </li>
  );
}
