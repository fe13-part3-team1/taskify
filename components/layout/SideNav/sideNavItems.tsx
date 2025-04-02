import { usePagination } from '@/components/Pagination/usePagination';
import PaginationControls from '@/components/Pagination/PaginationControls';
import PaginationItems from '@/components/Pagination/PaginationItems';
import AddDashboardButton from './AddDashboardButton';
import { useSideNavDashboards } from './useSideNavDashboards';
import DashboardListItem from './DashboardListItem';

interface SideNavItemsProps {
  selectedId: number | undefined;
  itemsPerPage: number;
}

export default function SideNavItems({ selectedId, itemsPerPage }: SideNavItemsProps) {
  const { dashboards } = useSideNavDashboards(itemsPerPage);
  const { currentPage, totalPages, goToPrev, goToNext } = usePagination(dashboards, itemsPerPage);

  return (
    <>
      <div id="sideNavItems" className="flex flex-1 flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-semi12 text-gray500 hidden md:block">Dash Boards</h2>
            <AddDashboardButton />
          </div>
          <ul className="my-4 space-y-2">
            <PaginationItems
              data={dashboards}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              renderItems={(dashboards) => (
                <>
                  {dashboards.map((dashboard) => (
                    <DashboardListItem
                      key={dashboard.id}
                      id={dashboard.id}
                      dashboardId={dashboard.id}
                      title={dashboard.title}
                      color={dashboard.color}
                      createdByMe={dashboard.createdByMe}
                      isSelected={dashboard.id === selectedId}
                    />
                  ))}
                </>
              )}
            />
          </ul>
        </div>
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          showPageInfo={false}
          goToPrev={goToPrev}
          goToNext={goToNext}
          justify="start"
        />
      </div>
    </>
  );
}
