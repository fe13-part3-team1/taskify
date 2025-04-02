'use server';

import EXTERNAL_API from '@/constants/api/external';
import { api } from '@/lib/api';
import {
  validateEmail,
  validateEqualPassword,
  validateLimitLengthNickname,
  validatePassword,
} from '@/utils/authValidate';

const SIGNUP_MESSAGE = {
  EMAIL: '이메일 형식으로 작성해 주세요.',
  NICKNAME: '닉네임은 10자 이하로 작성해 주세요.',
  PASSWORD: '비밀번호는 8자 이상 입력해 주세요.',
  CHECK_PASSWORD: '비밀번호가 일치하지 않습니다.',
  DUPLICATE_EMAIL: '이미 사용 중인 이메일입니다.',
  SERVER_ERROR: '다시 시도해 주세요!',
  SUCCESS: '가입이 완료되었습니다!',
};

export default async function signupAction(formData: FormData) {
  const email = formData.get('email')?.toString() || '';
  const nickname = formData.get('nickname')?.toString() || '';
  const password = formData.get('password')?.toString() || '';
  const checkPassword = formData.get('checkPassword')?.toString() || '';

  if (!validateEmail(email))
    return { status: false, field: 'email', message: SIGNUP_MESSAGE.EMAIL };

  if (!validateLimitLengthNickname(nickname))
    return { status: false, field: 'nickname', message: SIGNUP_MESSAGE.NICKNAME };

  if (!validatePassword(password))
    return { status: false, field: 'password', message: SIGNUP_MESSAGE.PASSWORD };

  if (!validateEqualPassword(password, checkPassword))
    return { status: false, field: 'checkPassword', message: SIGNUP_MESSAGE.CHECK_PASSWORD };

  try {
    const response = (await api.post(`${EXTERNAL_API.USERS.SIGNUP}`, {
      email,
      nickname,
      password,
    })) as {
      status?: number;
    };
    if (response.status === 201) {
      return {
        status: true,
        code: 'success',
        message: SIGNUP_MESSAGE.SUCCESS,
        credentials: { email, password },
      };
    }

    if (response.status === 409) {
      return {
        status: false,
        code: '409',
        message: SIGNUP_MESSAGE.DUPLICATE_EMAIL,
        credentials: null,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      status: false,
      code: 'server-error',
      message: SIGNUP_MESSAGE.SERVER_ERROR,
      credentials: null,
    };
  }
}
