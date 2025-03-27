import { useState, useActionState, startTransition } from 'react';
import signupAction from './action';
import { checkIfFormComplete, createFormData } from './utils';

export interface SignupType {
  email: string;
  nickname: string;
  password: string;
  checkPassword: string;
  isChecked: boolean;
}

// 변수명
const INITIAL_FORM_DATA_STATE = {
  email: '',
  nickname: '',
  password: '',
  checkPassword: '',
  isChecked: false,
};

const SPACE_KEY = ' ';

export default function useSignupForm() {
  const [formData, setFormData] = useState<SignupType>(INITIAL_FORM_DATA_STATE);
  const [isPasswordVisible, setIsPasswordVisible] = useState<Record<string, boolean>>({
    password: false,
    checkPassword: false,
  });
  const [state, formAction, isPending] = useActionState(signupAction, null);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIsChecked = () => {
    setFormData((prev) => ({
      ...prev,
      isChecked: !prev.isChecked,
    }));
  };

  const handlePreventSpace = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
  };

  // const handlePreventSpace = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key !== SPACE_KEY) return;
  //   e.preventDefault();
  // };

  const toggleVisiblePassword = (name: string) => {
    setIsPasswordVisible((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  // 부정조건 > 긍정조건 및 유틸화
  // const isFormIncomplete =
  //   !formData.email ||
  //   !formData.nickname ||
  //   !formData.password ||
  //   !formData.checkPassword ||
  //   !formData.isChecked;

  //폼이 완성된 상태의 변수가 필요하다 -> !isFormIncomplete

  // const isFormcomplete =
  // formData.email &&
  // formData.nickname &&
  // formData.password &&
  // formData.checkPassword &&
  // formData.isChecked;

  const isFormComplete = checkIfFormComplete(formData);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const fd = new FormData();
    // fd.append('email', formData.email);
    // fd.append('nickname', formData.nickname);
    // fd.append('password', formData.password);
    // fd.append('checkPassword', formData.checkPassword);

    const { isChecked, ...formDataWithoutCheck } = formData;
    console.log({ isChecked });
    const createdFormData = createFormData(formDataWithoutCheck);

    startTransition(() => {
      formAction(createdFormData);
    });
    // startTransition(() => {
    //   formAction(fd);
    // });
  };

  return {
    formData,
    handleFormChange,
    handleIsChecked,
    handlePreventSpace,
    isPasswordVisible,
    toggleVisiblePassword,
    isFormIncomplete: !isFormComplete,
    handleFormSubmit,
    state,
    isPending,
  };
}
