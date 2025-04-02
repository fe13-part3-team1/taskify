import MyDashboardSection from './MyDashboardSection';
import InvitedSection from './InvitedSection';

export default async function MyDashboard() {
  return (
    <div id="dashboardWrapper" className="m-10 max-w-[1022px]">
      <MyDashboardSection />
      <InvitedSection />
    </div>
  );
}
