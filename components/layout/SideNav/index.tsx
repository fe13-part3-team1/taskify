'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import SideNavItems from './sideNavItems';
import ROUTES from '@/constants/routes';

export default function SideNav() {
  const pathname = usePathname();
  const selectedId = Number(pathname?.split('/dashboard/')[1]?.split('/')[0]);

  const [itemsPerPage, setItemsPerPage] = useState(15);

  useEffect(() => {
    const calculateItemsPerPage = () => {
      const itemHeight = 50;
      const topOffset = 150;
      const bottomOffset = 157;
      const availableHeight = window.innerHeight - (topOffset + bottomOffset);
      const possibleItems = Math.floor(availableHeight / itemHeight);
      setItemsPerPage(possibleItems > 0 ? possibleItems : 1);
    };

    calculateItemsPerPage();
    window.addEventListener('resize', calculateItemsPerPage);
    return () => window.removeEventListener('resize', calculateItemsPerPage);
  }, []);

  return (
    <nav className="ease-in-outborder-r-gray300 h-screen w-[67px] border-r transition-all duration-100 md:w-[160px] lg:w-[300px]">
      <div id="sideNavWrapper" className="flex h-full flex-col gap-14 pt-5 pr-3 pb-[96px] pl-2">
        <h2 id="sideNavHeader">
          <Link href={ROUTES.HOME}>
            <Image
              src="/logo-large.svg"
              alt="Taskify 로고"
              width={109}
              height={33}
              className="mx-auto hidden md:block lg:ml-0"
            />
            <Image
              src="/logo-small.svg"
              alt="Taskify 로고"
              width={24}
              height={27}
              className="mx-auto block md:hidden"
            />
          </Link>
        </h2>
        <SideNavItems key={pathname} selectedId={selectedId} itemsPerPage={itemsPerPage} />
      </div>
    </nav>
  );
}
