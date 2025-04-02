import EXTERNAL_API from '@/constants/api/external';
import { api } from '@/lib/api';
import {
  DashboardInvitationListResponse,
  DashboardWithMembers,
  UpdateDashboardPayload,
} from './types';
import { Dashboard } from '@/app/(dashboard)/mydashboard/types';

export async function updateDashboard(dashboardId: number, payload: UpdateDashboardPayload) {
  try {
    return await api.put(EXTERNAL_API.DASHBOARDS.getDetail(dashboardId), payload);
  } catch (err) {
    throw err;
  }
}

export async function getDashboardDetail(dashboardId: number): Promise<Dashboard> {
  try {
    return await api.get(EXTERNAL_API.DASHBOARDS.getDetail(dashboardId));
  } catch (err) {
    throw err;
  }
}

export async function getMembers(dashboardId: number): Promise<DashboardWithMembers> {
  try {
    return await api.get(`${EXTERNAL_API.MEMBERS.ROOT}?dashboardId=${dashboardId}`);
  } catch (err) {
    throw err;
  }
}

export async function deleteMembers(memberId: number): Promise<DashboardWithMembers> {
  try {
    return await api.delete(EXTERNAL_API.MEMBERS.getDetail(memberId));
  } catch (err) {
    throw err;
  }
}

export async function inviteMember(dashboardId: number, email: string) {
  try {
    return await api.post(EXTERNAL_API.DASHBOARDS.invite(dashboardId), {
      email,
      dashboardId,
    });
  } catch (err) {
    throw err;
  }
}

export async function getDashboardInvitations(
  dashboardId: number
): Promise<DashboardInvitationListResponse> {
  const url = `${EXTERNAL_API.DASHBOARDS.invite(dashboardId)}`;
  try {
    return await api.get<DashboardInvitationListResponse>(url);
  } catch (err) {
    throw err;
  }
}

export async function cancelInvitation(dashboardId: number, invitationId: number) {
  try {
    await api.delete(EXTERNAL_API.DASHBOARDS.cancelInvite(dashboardId, invitationId));
  } catch (err) {
    console.error('초대 취소 실패:', err);
    throw err;
  }
}

export async function deleteDashboard(dashboardId: number) {
  try {
    return await api.delete(EXTERNAL_API.DASHBOARDS.getDetail(dashboardId));
  } catch (err) {
    console.error('대시보드 삭제 실패:', err);
    throw err;
  }
}
