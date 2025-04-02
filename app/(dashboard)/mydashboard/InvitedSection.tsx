'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
// import { getInvitations } from '@/api/invitation';
// import { acceptInvitation, rejectInvitation } from '@/api/actions';
import InvitedDashboardList from './InvitedDashboardList';
import Input from '@/components/common/Input';
import { Invitation } from './types';
import { acceptInvitation, getInvitationsList, rejectInvitation } from './data';
// import { Invitation } from '@/types';

interface Props {
  invitations: Invitation[];
}

export default function InvitedSection({ invitations: initialInvitations }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [keyword, setKeyword] = useState('');
  const [cursorId, setCursorId] = useState<number | undefined>(undefined);
  const [hasNextPage, setHasNextPage] = useState(true);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    setInvitations(initialInvitations);
    if (initialInvitations.length > 0) {
      setCursorId(initialInvitations[initialInvitations.length - 1].id);
    } else {
      setHasNextPage(false);
    }
  }, [initialInvitations]);

  const fetchNextPage = useCallback(async () => {
    if (!hasNextPage || isLoading) return;
    setIsLoading(true);
    try {
      const res = await getInvitationsList({ size: 3, cursorId });
      const newInvitations = res.invitations;

      if (newInvitations.length === 0) {
        setHasNextPage(false);
        return;
      }

      const unique = newInvitations.filter(
        (inv) => !invitations.some((existing) => existing.id === inv.id)
      );

      setInvitations((prev) => [...prev, ...unique]);
      setCursorId(newInvitations[newInvitations.length - 1].id);
    } catch (err) {
      console.error('추가 초대 가져오기 실패:', err);
    } finally {
      setIsLoading(false);
    }
  }, [cursorId, hasNextPage, isLoading, invitations]);

  useInfiniteScroll({
    scrollRef,
    fetchNextPage,
    hasNextPage,
    threshold: 150,
  });

  const handleAccept = async (id: number) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      await acceptInvitation(id);
      router.refresh();
      setInvitations((prev) => prev.filter((inv) => inv.id !== id));
    } catch (err) {
      console.error('초대 수락 에러:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async (id: number) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      await rejectInvitation(id);
      router.refresh();
      setInvitations((prev) => prev.filter((inv) => inv.id !== id));
    } catch (err) {
      console.error('초대 거절 에러:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const filtered = invitations.filter((inv) =>
    inv.dashboard.title.toLowerCase().includes(keyword.toLowerCase())
  );

  if (invitations.length === 0) {
    return (
      <div className="relative h-[390px] rounded-2xl bg-white px-10 py-6">
        <h3 className="text-bold24 text-black200">초대받은 대시보드</h3>
        <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-[30px]">
          <div className="relative h-[75px] w-[87px]">
            <Image src="/invite.svg" fill alt="초대받은 대시보드" />
          </div>
          <p className="text-gray400 text-regular18">아직 초대받은 대시보드가 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 rounded-lg bg-white py-6">
      <div className="flex flex-col gap-8 px-10">
        <h3 className="text-bold24 text-black200">초대받은 대시보드</h3>
        <Input
          placeholder="검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          size={16}
          customInputClass="h-6"
          customBorderClass="py-[7px]"
          leftIcon={
            <Image
              src="/icons/search.svg"
              alt="검색 아이콘"
              width={17}
              height={17}
              className="ml-1"
            />
          }
        />
      </div>
      <InvitedDashboardList
        isLoading={isLoading}
        invitations={filtered}
        onAccept={handleAccept}
        onReject={handleReject}
        scrollRef={scrollRef}
      />
    </div>
  );
}
