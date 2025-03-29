'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import UserBadge from '@/components/UserBadge/UserBadge';
import { useClickOutside } from '@/hooks/useClickOutside';
import ROUTES from '@/constants/routes';
import INTERNAL_API from '@/constants/api/internal';
import { removeItem } from '@/utils/localstorage';

export default function UserMenu({
  nickname,
  profileImageUrl,
}: {
  nickname: string;
  profileImageUrl: string;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useClickOutside(dropdownRef, closeMenu);

  const logout = async () => {
    const res = await fetch(`${INTERNAL_API.AUTH.LOGOUT}`, {
      method: 'POST',
    });

    const data: { success: boolean } = await res.json();

    if (!data.success) {
      return;
    }

    router.push(`${ROUTES.HOME}`);
    removeItem('userInfo');
    removeItem('accessToken');
  };

  return (
    <div className="relative flex items-center" ref={dropdownRef}>
      <button onClick={toggleMenu}>
        <UserBadge
          size={38}
          gap={12}
          userName={nickname}
          profile={profileImageUrl}
          fontSize="M16"
          responsive={true}
        />
      </button>
      {isOpen && (
        <ul className="border-gray300 absolute top-10 right-0 z-1 mt-1 flex max-h-40 w-fit min-w-24 flex-col items-stretch justify-start gap-1 overflow-y-auto rounded-md border bg-white px-1.5 py-2 drop-shadow-[0px_4px_20px_rgba(0,0,0,0.08)] filter md:-right-8">
          <li className="hover:bg-violet8 hover:text-violet flex min-h-8 cursor-pointer flex-row items-center justify-start gap-2 rounded-sm px-4 py-1">
            <Link href="/mypage" className="text-regular14 w-full cursor-pointer rounded-sm">
              <span className="truncate">마이페이지</span>
            </Link>
          </li>
          <li
            className="hover:bg-violet8 hover:text-violet flex min-h-8 cursor-pointer flex-row items-center justify-start gap-2 rounded-sm px-4 py-1"
            onClick={logout}
          >
            <button className="text-regular14 w-full cursor-pointer rounded-sm">
              <span className="truncate">로그아웃</span>
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
