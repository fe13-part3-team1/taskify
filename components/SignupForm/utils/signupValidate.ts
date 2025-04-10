import { AUTH_MESSAGE } from '@/constants/message/authMessage';
import { ResponseState, SignupType } from './useSignupForm';
import {
  validateEmail,
  validateLimitLengthNickname,
  validatePassword,
  validatePasswordLength,
  validateEqualPassword,
} from '@/utils/authValidate';

const signupValidate = (formData: SignupType): ResponseState | null => {
  const { email, nickname, password, checkPassword } = formData;

  if (!validateEmail(email)) {
    return {
      success: false,
      field: 'email',
      message: AUTH_MESSAGE.EMAIL,
    };
  }

  if (!validateLimitLengthNickname(nickname)) {
    return {
      success: false,
      field: 'nickname',
      message: AUTH_MESSAGE.NICKNAME,
    };
  }

  if (!validatePasswordLength(password)) {
    return {
      success: false,
      field: 'password',
      message: AUTH_MESSAGE.PASSWORD_LENGTH,
    };
  }

  if (!validatePassword(password)) {
    return {
      success: false,
      field: 'password',
      message: AUTH_MESSAGE.PASSWORD_VALID,
    };
  }

  if (!validateEqualPassword(password, checkPassword)) {
    return {
      success: false,
      field: 'checkPassword',
      message: AUTH_MESSAGE.CHECK_PASSWORD,
    };
  }

  return null;
};

export default signupValidate;
