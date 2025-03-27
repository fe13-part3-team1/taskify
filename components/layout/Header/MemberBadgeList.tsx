import UserBadge from '@/components/UserBadge/UserBadge';
import clsx from 'clsx';

interface Member {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
}

export default function MemberBadgeList({
  members = [], // fallbacck 데이터
  totalCount,
}: {
  members: Member[];
  totalCount: number;
}) {
  // CSS만 사용해서 수치를 보여주기 위해, 변수를 따로 초기화했습니다.
  const restMemberCount = totalCount - 2;
  const restMemberCountLg = totalCount - 4;

  return (
    <ul className="ml-4 flex items-center md:ml-8 lg:ml-10">
      {/* FIXME: 뱃지 반응형 크기 - mobile에서 size가 34 */}
      {members?.map(({ id }, idx) => {
        return (
          idx < 4 && (
            <li key={id} className={clsx(idx !== 0 && '-ml-3', idx > 1 && 'hidden lg:block')}>
              <UserBadge size={38} />
            </li>
          )
        );
      })}
      {restMemberCount > 0 && (
        <li className="text-medium14 md:text-medium16 -ml-3 size-[38px] rounded-full border-[2px] border-solid border-white bg-red-100 text-center leading-[34px] text-red-400 select-none lg:hidden">
          {`+${restMemberCount}`}
        </li>
      )}
      {restMemberCountLg > 0 && (
        <li className="text-medium14 md:text-medium16 -ml-3 hidden size-[38px] rounded-full border-[2px] border-solid border-white bg-red-100 text-center leading-[34px] text-red-400 select-none lg:block">
          {`+${restMemberCountLg}`}
        </li>
      )}
    </ul>
  );
}
