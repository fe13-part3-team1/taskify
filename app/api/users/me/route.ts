import EXTERNAL_API from '@/constants/api/external';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// type SuccessResponse = {
//   id: number;
//   email: string;
//   nickname: string;
//   profileImageUrl: string;
//   createdAt: string;
//   updatedAt: string;
// };

// type FailureRespnose = {
//   message: string;
// };

export async function PUT(req: Request) {
  const { nickname: newNickName, profileImageUrl: newProfileImageUrl } = await req.json();
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${EXTERNAL_API.USERS.UPDATE_ME}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({ nickname: newNickName, profileImageUrl: newProfileImageUrl }),
  });

  const status = res.status;
  const responseData = await res.json();

  if (status !== 200) {
    const response = NextResponse.json(
      { success: false, message: responseData?.message || '알 수 없는 오류로 요청 실패' },
      { status: status }
    );

    return response;
  }

  const response = NextResponse.json({ success: true, userInfo: responseData }, { status: 200 });

  response.cookies.set('userInfo', JSON.stringify(responseData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    // maxAge: 60 * 60,
  });

  return response;
}
