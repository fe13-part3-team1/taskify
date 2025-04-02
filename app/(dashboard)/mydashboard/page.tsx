import MyDashboardSection from './MyDashboardSection';
import InvitedSection from './InvitedSection';
import { Dashboard, Invitation } from './types';
import { getInvitations, getMyDashboards } from './data';

export default async function MyDashboard() {
  let dashboards: Dashboard[] = [];
  let invitations: Invitation[] = [];

  try {
    const dashboardData = await getMyDashboards();
    dashboards = dashboardData.dashboards;

    const invitationData = await getInvitations();
    invitations = invitationData.invitations;
  } catch (err) {
    console.error('대시보드 목록 불러오기 에러:', err);
  }

  const pendingInvitations = invitations.filter((invitation) => invitation.inviteAccepted === null);

  return (
    <div id="dashboardWrapper" className="m-10 max-w-[1022px]">
      <MyDashboardSection mydashboards={dashboards} />
      <InvitedSection invitations={pendingInvitations} />
    </div>
  );
}
