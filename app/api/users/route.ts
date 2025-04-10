import { AUTH_MESSAGE } from '@/constants/message/authMessage';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, nickname, password } = await req.json();

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, nickname, password }),
  });

  const status = response.status;

  if (status === 409) {
    return NextResponse.json(
      {
        success: false,
        code: '409',
        message: AUTH_MESSAGE.DUPLICATE_EMAIL,
      },
      { status: 409 }
    );
  }

  if (status === 201) {
    return NextResponse.json(
      {
        success: true,
        data: response,
        code: 'success',
        message: AUTH_MESSAGE.SUCCESS,
        credentials: { email, password },
      },
      { status: 201 }
    );
  } else {
    return NextResponse.json({ success: false, data: response }, { status: status });
  }
}
