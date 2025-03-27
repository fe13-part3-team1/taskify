import { SignupType } from '../useSignupForm';

export const checkIfFormComplete = (formData: SignupType) => {
  return Object.values(formData).every((value) => !!value);
};

type FormDataValue = string | Blob | File;

export const createFormData = <T extends Record<string, FormDataValue>>(data: T): FormData => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (!value) return;
    formData.append(key, value);
  });

  return formData;
};
