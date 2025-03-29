import DashboardHeader from '@/components/layout/Header/DashboardHeader';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ dashboardId: string }>;
}) {
  const { dashboardId } = await params;

  return (
    <>
      <DashboardHeader dashboardId={Number(dashboardId)} />
      <main className="h-[calc(100vh-70px)]">{children}</main>
    </>
  );
}
