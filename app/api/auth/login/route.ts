import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const status = res.status;
  const responseData = await res.json();

  switch (status) {
    case 201: {
      const userInfo = responseData.user;
      const accessToken = responseData.accessToken;

      const response = NextResponse.json({ success: true, data: responseData }, { status: 201 });

      response.cookies.set('userInfo', JSON.stringify(userInfo), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        // maxAge: 60 * 60,
      });

      response.cookies.set('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        // maxAge: 60 * 60,
      });

      return response;
    }

    case 400:
      return NextResponse.json({ success: false, message: responseData.message }, { status: 400 });

    case 404:
      return NextResponse.json({ success: false, message: responseData.message }, { status: 404 });

    case 500:
      return NextResponse.json({ success: false, message: responseData.message }, { status: 500 });
  }
}
