import AddColumnBtn from '@/components/Dashboard/AddColumnBtn';
import DashboardColumn from '@/components/Dashboard/DashboardColumn/DashboardColum';
import getDashboardColumn from '@/components/Dashboard/DashboardColumn/action';

export default async function DashboardId({
  params,
}: {
  params: Promise<{ dashboardId: string }>;
}) {
  const dashboardId = (await params).dashboardId;

  const columns = await getDashboardColumn(Number(dashboardId));
  if (!columns) return;

  return (
    <div className="flex h-full flex-col overflow-x-scroll lg:flex-row">
      {columns.map((column) => (
        <DashboardColumn key={column.id} columnTitle={column.title} columnId={column.id} />
      ))}
      <div className="fixed inset-x-3 bottom-7 lg:static lg:mx-5 lg:mt-[68px]">
        <AddColumnBtn />
      </div>
    </div>
  );
}
