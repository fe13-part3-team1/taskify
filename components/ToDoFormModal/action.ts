import EXTERNAL_API from '@/constants/api/external';
import { api } from '@/lib/api';
import { getItem } from '@/utils/localstorage';

export interface Member {
  id: number;
  nickname: string;
  profileImageUrl: string | null;
  userId: number;
}

interface MembersPromise {
  members: Member[];
  totalCount: number;
}

export async function getMembers(dashboardId: number) {
  const response = await api.get<MembersPromise>(
    `${EXTERNAL_API.MEMBERS.ROOT}?dashboardId=${dashboardId}`
  );
  return response;
}

export async function postDashboardCardImage(columnId: number, file: File) {
  const imageFormData = new FormData();
  imageFormData.append('image', file);

  const accessToken = getItem('accessToken');

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/columns/${columnId}/card-image`,
    {
      method: 'POST',
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
      body: imageFormData,
    }
  );

  return response.json();
}
