import Link from 'next/link';
import ArrowIcon from '@/assets/icons/ArrowIcon';

export default function BackLink({ id }: { id: string }) {
  return (
    <Link href={`/dashboard/${id}`} className="flex items-center gap-[14px]">
      <ArrowIcon width="8" height="15" />
      돌아가기
    </Link>
  );
}
