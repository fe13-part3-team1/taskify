import Link from 'next/link';
import ArrowIcon from '@/assets/icons/ArrowIcon';

export default function BackLink({ dashboardId }: { dashboardId: number }) {
  return (
    <Link href={`/dashboard/${dashboardId}`} className="flex items-center gap-[14px]">
      <ArrowIcon width="8" height="15" />
    <span className='text-medium14 md:text-medium16'>돌아가기</span>
    </Link>
  );
}
