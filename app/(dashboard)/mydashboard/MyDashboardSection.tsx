'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useModal } from '@/hooks/useModal';
import { MockDashboard } from '@/mocks/dashboards';
import Button from '@/components/common/Button';
import MyDashboardListItem from './MyDashboardListItem';
import PaginationItems from '@/components/Pagination/PaginationItems';
import PaginationControls from '@/components/Pagination/PaginationControls';
import CreateDashboardModal from './CreateDashboardModal';

interface Props {
  mydashboards: MockDashboard[];
}

export default function MyDashboardSection({ mydashboards }: Props) {
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState(1);
  const { isOpen, open, close } = useModal();
  const selectedId = pathname?.split('/dashboard/')[1]?.split('/')[0];

  if (mydashboards.length === 0) {
    return (
      <div className="mb-[114px] flex flex-col gap-3">
        <Button variant="outline" size="dashboardCard" onClick={open}>
          <span className="text-black200 text-semi14 md:text-semi16">새로운 대시보드</span>
          <Image src="/icons/plus.svg" alt="추가" width={16} height={16} className="mr-2 ml-3" />
        </Button>
      </div>
    );
  }

  const itemsPerPage = 6;
  const totalPages = Math.ceil(mydashboards.length / itemsPerPage);

  const goToPrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="mb-[40px] flex flex-col gap-3">
      <PaginationItems
        data={mydashboards}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        wrapperClassName="grid grid-cols-3 grid-rows-2 gap-[13px]"
        renderFixedItem={() => (
          <Button variant="outline" size="dashboardCard" onClick={open}>
            <span className="text-black200 text-semi14 md:text-semi16">새로운 대시보드</span>
            <Image src="/icons/plus.svg" alt="추가" width={16} height={16} className="mr-2 ml-3" />
          </Button>
        )}
        renderItems={(pageItems) => (
          <>
            {pageItems.map((dashboard) => (
              <MyDashboardListItem
                key={dashboard.id}
                dashboardId={dashboard.id}
                title={dashboard.title}
                colorKey={dashboard.color}
                createdByMe={dashboard.createdByMe}
                isSelected={String(dashboard.id) === selectedId}
              />
            ))}
          </>
        )}
      />

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        goToPrev={goToPrev}
        goToNext={goToNext}
      />

      <CreateDashboardModal isOpen={isOpen} onClose={close} />
    </div>
  );
}
