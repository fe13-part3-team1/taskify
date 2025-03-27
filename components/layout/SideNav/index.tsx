'use client';

import Link from 'next/link';
import Image from 'next/image';
import DashboardListItem from './DashboardListItem';
import AddDashboardButton from './AddDashboardButton';
import { useEffect, useState } from 'react';
import { mockDashboards, MockDashboard } from '@/mocks/dashboards';

export default function SideNav() {
  // mock data 적용
  // const [dashboards, setDashboards] = useState<MockDashboard[]>([]);
  const [dashboards, setDashboards] = useState<MockDashboard[]>(mockDashboards);

  useEffect(() => {
    setDashboards(mockDashboards);
  }, []);

  return (
    <nav className="h-screen w-[300px]">
      <div id="sideNavWrapper" className="flex flex-col gap-14 pt-5 pr-3 pl-2">
        <h2 id="sideNavHeader">
          <Link href="/">
            <Image src="/logo-large.svg" alt="Taskify 로고" width={109} height={33} />
          </Link>
        </h2>
        <div id="sideNavItems" className="flex flex-1 flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-semi12 text-gray500">Dash Boards</h2>
            <AddDashboardButton />
          </div>
          <ul>
            {dashboards.map((dashboard) => (
              <DashboardListItem
                key={dashboard.id}
                id={dashboard.id}
                title={dashboard.title}
                color={dashboard.color}
                createdByMe={dashboard.createdByMe}
              />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
