'use server';

import { api } from '@/lib/api';
import {
  validateEmail,
  validateEqualPassword,
  validateLimitLengthNickname,
  validatePassword,
} from '@/utils/authValidate';

const STATUS_MESSAGE = {
  EMAIL: '이메일 형식으로 작성해 주세요.',
  NICKNAME: '닉네임은 10자 이하로 작성해 주세요.',
  PASSWORD: '비밀번호는 8자 이상 입력해 주세요.',
  CHECK_PASSWORD: '비밀번호가 일치하지 않습니다.',
  SERVER_ERROR: '다시 시도해 주세요!',
  SUCCESS: '가입이 완료되었습니다!',
};

const STATUS_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

const getActionResult = ({
  type,
  isSuccess,
}: {
  type: keyof typeof STATUS_MESSAGE;
  isSuccess: boolean;
}) => {
  const message = isSuccess ? STATUS_MESSAGE.SUCCESS : STATUS_MESSAGE[type];

  if (isSuccess) return { success: STATUS_TYPE.SUCCESS, message };
  return { success: STATUS_TYPE.ERROR, type, message };
};

export default async function signupAction(_: unknown, formData: FormData) {
  const email = formData.get('email')?.toString() || '';
  const nickname = formData.get('nickname')?.toString() || '';
  const password = formData.get('password')?.toString() || '';
  const checkPassword = formData.get('checkPassword')?.toString() || '';

  if (!validateEmail(email))
    return { status: false, field: 'email', message: '이메일 형식으로 작성해 주세요.' };

  if (!validateLimitLengthNickname(nickname))
    return { status: false, field: 'nickname', message: '닉네임은 10자 이하로 작성해 주세요.' };

  if (!validatePassword(password))
    return { status: false, field: 'password', message: '비밀번호는 8자 이상 입력해 주세요.' };

  if (!validateEqualPassword(password, checkPassword))
    return { status: false, field: 'checkPassword', message: '비밀번호가 일치하지 않습니다.' };

  // if (!validateEmail(email)) return getActionResult({ type: 'EMAIL', isSuccess: false });

  // if (!validateLimitLengthNickname(nickname))
  //   return getActionResult({ type: 'NICKNAME', isSuccess: false });

  // if (!validatePassword(password)) return getActionResult({ type: 'PASSWORD', isSuccess: false });

  // if (!validateEqualPassword(password, checkPassword))
  //   return getActionResult({ type: 'CHECK_PASSWORD', isSuccess: false });

  // export const API_PATH_LIST = {
  //   SIGNUP: '/users',
  // } as const;

  try {
    // 경로 상수화
    await api.post('/users', {
      email,
      nickname,
      password,
    });

    return {
      status: true,
      message: '가입이 완료되었습니다!',
    };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      message: '다시 시도해 주세요!',
    };
  }
}
