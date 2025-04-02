export type Dashboard = {
  id: number;
  title: string;
  color: string;
  createdAt?: string;
  updatedAt?: string;
  createdByMe: boolean;
  userId?: number;
};

export type DashboardListResponse = {
  dashboards: Dashboard[];
  totalCount: number;
};

export type Invitation = {
  id: number;
  inviter: {
    nickname: string;
    email: string;
    id: number;
  };
  invitee: {
    nickname: string;
    email: string;
    id: number;
  };
  teamId: string;
  dashboard: {
    title: string;
    id: number;
  };
  inviteAccepted: boolean | null;
  createdAt: string;
  updatedAt: string;
};

export type InvitationListResponse = {
  invitations: Invitation[];
  cursorId: number;
};