import Image from 'next/image';
import { cookies } from 'next/headers';
import MemberBadgeList from '@/components/layout/Header/MemberBadgeList';
import UserMenu from '@/components/layout/Header/UserMenu';
import { api } from '@/lib/api';
import EXTERNAL_API from '@/constants/api/external';
import Navigation from './Navigation';

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

type MemberResponse = {
  members: Member[];
  totalCount: 0;
};

type DashboardDetailResponse = {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
};

export default async function DashboardHeader({ dashboardId }: { dashboardId: number }) {
  const { members, totalCount } = await api.get<MemberResponse>(
    `${EXTERNAL_API.MEMBERS.ROOT}?size=4&dashboardId=${dashboardId}`
  );
  const { title, createdByMe } = await api.get<DashboardDetailResponse>(
    `${EXTERNAL_API.DASHBOARDS.getDetail(dashboardId)}`
  );

  const cookieStore = await cookies();
  const { nickname, profileImageUrl } = JSON.parse(cookieStore.get('userInfo')?.value || '');

  return (
    <header className="border-b-gray300 sticky top-0 z-990 flex h-15 items-center justify-between border-b-1 bg-white px-3 md:h-17.5 md:px-10 lg:pr-20 lg:pl-10">
      <div className="invisible w-0 lg:visible lg:flex lg:w-fit lg:gap-2">
        <span className="text-bold20 select-none">{title}</span>
        {createdByMe && (
          <Image src="/icons/crown.svg" width={20} height={16} alt="내가 만든 대시보드" />
        )}
      </div>
      <div className="flex items-center">
        {createdByMe && <Navigation dashboardId={dashboardId} />}
        <MemberBadgeList members={members} totalCount={totalCount} />
        <div className="bg-gray300 mx-3 h-8.5 w-[1px] md:mx-6 md:h-[9.5] lg:mx-8"></div>
        <UserMenu nickname={nickname} profileImageUrl={profileImageUrl} />
      </div>
    </header>
  );
}
