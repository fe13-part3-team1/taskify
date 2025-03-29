'use client';

import Button from '@/components/common/Button';
import UserIcon from '@/assets/icons/UserIcon';
import { useState } from 'react';
import PaginationItems from '@/components/Pagination/PaginationItems';
import PaginationControls from '@/components/Pagination/PaginationControls';

interface Member {
  id: number;
  nickname: string;
}

interface Props {
  initialMembers?: Member[];
}

// mock data 임시 적용
const mockMembers = [
  { id: 1, nickname: '홍길동' },
  { id: 2, nickname: '김개발자' },
  { id: 3, nickname: '이테스트' },
  { id: 4, nickname: '박동길' },
  { id: 5, nickname: '이수박' },
  { id: 6, nickname: '김자갈' },
  { id: 7, nickname: '강바울' },
  { id: 8, nickname: '한폴리' },
  { id: 9, nickname: '주백호' },
];

export default function MemberListSection({ initialMembers = mockMembers }: Props) {
  const [members, setMembers] = useState<Member[]>(initialMembers || []);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(mockMembers.length / itemsPerPage);

  const goToPrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  // TODO: 데이터 연동 후 수정
  const deleteMember = async (memberId: number) => {
    console.log(`[임시] 삭제 요청: 구성원 ID ${memberId}`);
    return Promise.resolve();
  };

  const handleDeleteMember = async (memberId: number) => {
    try {
      await deleteMember(memberId);
      setMembers((prev) => prev.filter((m) => m.id !== memberId));
    } catch (error) {
      console.error('구성원 삭제 실패:', error);
    }
  };

  return (
    <div id="section" className="rounded-2xl bg-white pt-[32px]">
      <div className="mb-[27px] flex items-center justify-between px-[28px]">
        <h3 className="text-bold24">구성원</h3>
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          goToPrev={goToPrev}
          goToNext={goToNext}
        />
      </div>

      <div className="w-full rounded-lg">
        <h4 className="text-gray400 text-regular16 px-[28px]">이름</h4>
        <PaginationItems
          data={members}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          renderItems={(members) => (
            <>
              {members.map((member) => (
                <>
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
                </>
              ))}
            </>
          )}
        />
      </div>
    </div>
  );
}
