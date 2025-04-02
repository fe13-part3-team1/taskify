import { Dashboard } from '@/app/(dashboard)/mydashboard/types';

export type UpdateDashboardPayload = {
  title: string;
  color: string;
};

export type Member = {
  id: number;
  nickname: string;
};

export type DashboardWithMembers = Dashboard & {
  members: Member[];
};

export type DashboardInvitation = {
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
  dashboard: {
    id: number;
    title: string;
  };
  teamId: string;
  inviteAccepted: boolean | null;
  createdAt: string;
  updatedAt: string;
};

export type DashboardInvitationListResponse = {
  invitations: DashboardInvitation[];
  totalCount: number;
};
