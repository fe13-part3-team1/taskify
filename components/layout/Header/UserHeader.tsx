import { cookies } from 'next/headers';
import UserMenu from '@/components/layout/Header/UserMenu';

export default async function UserHeader({ title }: { title: string }) {
  const cookieStore = await cookies();

  const { nickname, profileImageUrl } = JSON.parse(cookieStore.get('userInfo')?.value || '');

  return (
    <header className="border-b-gray300 sticky top-0 z-990 flex h-15 items-center justify-between border-b-1 bg-white px-3 md:h-17.5 md:px-10 lg:pr-20 lg:pl-10">
      <span className="text-bold20 select-none">{title}</span>
      <UserMenu nickname={nickname} profileImageUrl={profileImageUrl} />
    </header>
  );
}
