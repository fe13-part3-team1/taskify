'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/common/Button';
import UserIcon from '@/assets/icons/UserIcon';
import PaginationItems from '@/components/Pagination/PaginationItems';
import PaginationControls from '@/components/Pagination/PaginationControls';
import { usePagination } from '@/components/Pagination/usePagination';
import { deleteMembers, getMembers } from './data';

interface Member {
  id: number;
  nickname: string;
}

export default function MemberListSection({ dashboardId }: { dashboardId: number }) {
  const [members, setMembers] = useState<Member[]>([]);
  const itemsPerPage = 3;
  const { currentPage, totalPages, goToPrev, goToNext } = usePagination(members, itemsPerPage);

  useEffect(() => {
    if (!dashboardId) return;

    const fetchMembers = async () => {
      try {
        const { members } = await getMembers(dashboardId);
        setMembers(members);
      } catch (error) {
        console.error('구성원 목록 불러오기 실패:', error);
      }
    };

    fetchMembers();
  }, [dashboardId]);

  const handleDeleteMember = async (memberId: number) => {
    try {
      await deleteMembers(memberId);
      setMembers((prev) => prev.filter((m) => m.id !== memberId));
    } catch (error) {
      console.error('구성원 삭제 실패:', error);
    }
  };

  return (
    <div id="section" className="rounded-2xl bg-white pt-[32px]">
      <div className="mb-[27px] flex items-center justify-between px-[28px]">
        <h3 className="text-bold20 md:text-bold24">구성원</h3>
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          goToPrev={goToPrev}
          goToNext={goToNext}
        />
      </div>

      <div className="w-full rounded-lg">
        <h4 className="text-gray400 text-regular14 md:text-regular16 px-[28px]">이름</h4>
        <PaginationItems
          data={members}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          renderItems={(members) => (
            <>
              {members.map((member) => (
                <div key={member.id} className="border-gray200 border-b">
                  <div className="flex justify-between px-[28px] py-[16px]">
                    <div className="flex items-center gap-[12px]">
                      <UserIcon width={38} height={38} />
                      <span>{member.nickname}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="delete"
                      onClick={() => handleDeleteMember(member.id)}
                    >
                      삭제
                    </Button>
                  </div>
                </div>
              ))}
            </>
          )}
        />
      </div>
    </div>
  );
}
