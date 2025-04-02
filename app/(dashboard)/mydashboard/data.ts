import EXTERNAL_API from '@/constants/api/external';
import { api } from '@/lib/api';
import { DashboardListResponse, Invitation, InvitationListResponse } from './types';

export async function getMyDashboards(
  page: number = 1,
  size: number = 100
): Promise<DashboardListResponse> {
  const query = `?navigationMethod=pagination&page=${page}&size=${size}`;
  try {
    return await api.get<DashboardListResponse>(`${EXTERNAL_API.DASHBOARDS.ROOT}${query}`);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getInvitations(): Promise<InvitationListResponse> {
  try {
    return await api.get<InvitationListResponse>(EXTERNAL_API.INVITATIONS.ROOT);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function acceptInvitation(id: number): Promise<Invitation> {
  try {
    return await api.put<Invitation>(EXTERNAL_API.INVITATIONS.acceptInvitation(id), {
      inviteAccepted: true,
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function rejectInvitation(id: number): Promise<Invitation> {
  try {
    return await api.put<Invitation>(EXTERNAL_API.INVITATIONS.acceptInvitation(id), {
      inviteAccepted: false,
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

interface GetInvitationsParams {
  size?: number;
  cursorId?: number;
  title?: string;
}

export async function getInvitationsList({
  size = 3,
  cursorId,
  title,
}: GetInvitationsParams): Promise<InvitationListResponse> {
  const params = new URLSearchParams();

  if (size) params.append('size', String(size));
  if (cursorId) params.append('cursorId', String(cursorId));
  if (title) params.append('title', title);

  const query = params.toString() ? `?${params.toString()}` : '';

  try {
    return await api.get<InvitationListResponse>(`${EXTERNAL_API.INVITATIONS.ROOT}${query}`);
  } catch (err) {
    console.error('초대 목록 가져오기 실패:', err);
    throw err;
  }
}
