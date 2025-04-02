'use client';

import MyDashboardSection from './MyDashboardSection';
import InvitedSection from './InvitedSection';
import { Dashboard, Invitation } from './types';
import { getInvitations, getMyDashboards } from './data';
import { useEffect, useState } from 'react';

export default function MyDashboard() {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  // let dashboards: Dashboard[] = [];
  // let invitations: Invitation[] = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboardData = await getMyDashboards();
        // dashboards = dashboardData.dashboards;
        setDashboards(dashboardData.dashboards);

        const invitationData = await getInvitations();
        // invitations = invitationData.invitations;
        setInvitations(invitationData.invitations);
      } catch (err) {
        console.error('대시보드 목록 불러오기 에러:', err);
      }
    };

    fetchData();
  }, [dashboards, invitations]);

  const pendingInvitations = invitations.filter((invitation) => invitation.inviteAccepted === null);

  return (
    <div id="dashboardWrapper" className="m-10 max-w-[1022px]">
      <MyDashboardSection mydashboards={dashboards} />
      <InvitedSection invitations={pendingInvitations} />
    </div>
  );
}
