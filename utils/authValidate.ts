const Email_Regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const Password_Regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;

export const validateEmail = (value: string) => {
  return Email_Regex.test(value);
};

export const validateLimitLengthNickname = (value: string) => {
  return value.length <= 10;
};

export const validatePassword = (value: string) => {
  return Password_Regex.test(value);
};

export const validateEqualPassword = (password: string, checkPassword: string) => {
  return password === checkPassword;
};
