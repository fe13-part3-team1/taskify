'use server';

import { api } from '@/lib/api';
import {
  validateEmail,
  validateEqualPassword,
  validateLimitLengthNickname,
  validatePassword,
} from '@/utils/authValidate';

export default async function signupAction(_: unknown, formData: FormData) {
  const email = formData.get('email')?.toString() || '';
  const nickname = formData.get('nickname')?.toString() || '';
  const password = formData.get('password')?.toString() || '';
  const checkPassword = formData.get('checkPassword')?.toString() || '';

  if (!validateEmail(email))
    return { status: false, field: 'email', err: '이메일 형식으로 작성해 주세요.' };

  if (!validateLimitLengthNickname(nickname))
    return { status: false, field: 'nickname', err: '닉네임은 10자 이하로 작성해 주세요.' };

  if (!validatePassword(password))
    return { status: false, field: 'password', err: '비밀번호는 8자 이상 입력해 주세요.' };

  if (!validateEqualPassword(password, checkPassword))
    return { status: false, field: 'checkPassword', err: '비밀번호가 일치하지 않습니다.' };

  try {
    await api.post('/users', {
      email,
      nickname,
      password,
    });
    return {
      status: true,
      err: '가입이 완료되었습니다!',
    };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      err: '다시 시도해 주세요!',
    };
  }
}
