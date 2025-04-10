import { useState } from 'react';
import checkAllFormComplete from '@/utils/checkAllFormComplete';
import { setItem } from '@/utils/localstorage';
import login from './login';
import { useRouter } from 'next/navigation';
import signupValidate from './signupValidate';

export interface SignupType {
  email: string;
  nickname: string;
  password: string;
  checkPassword: string;
  isChecked: boolean;
}

export interface ResponseState {
  success: boolean;
  code?: string;
  field?: string;
  message: string;
  credentials?: { email: string; password: string } | null;
}

const INITIAL_SIGNUP_FORM_VALUE = {
  email: '',
  nickname: '',
  password: '',
  checkPassword: '',
  isChecked: false,
};

const SPACE_KEY = ' ';

export default function useSignupForm() {
  const [formData, setFormData] = useState<SignupType>(INITIAL_SIGNUP_FORM_VALUE);
  const [isPasswordVisible, setIsPasswordVisible] = useState<Record<string, boolean>>({
    password: false,
    checkPassword: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [state, setState] = useState<ResponseState>({
    success: false,
    code: '',
    field: '',
    message: '',
  });
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

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
    if (e.key !== SPACE_KEY) return;
    e.preventDefault();
  };

  const toggleVisiblePassword = (name: string) => {
    setIsPasswordVisible((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const isFormComplete = checkAllFormComplete({
    email: formData.email,
    nickname: formData.nickname,
    password: formData.password,
    checkPassword: formData.checkPassword,
    isChecked: formData.isChecked,
  });

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormComplete) return;

    const validation = signupValidate(formData);

    if (validation) {
      return setState(validation);
    }

    setIsPending(true);

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          nickname: formData.nickname,
          password: formData.password,
          passwordConfirmation: formData.checkPassword,
        }),
      });

      const result = await response.json();
      const { code, success, field, message, credentials } = result;

      setState({ success, field, message, credentials });

      if (code) {
        setIsModalOpen(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsPending(false);
    }
  };

  const handleCloseModal = async () => {
    const credentials = state?.credentials;

    if (!credentials) return;
    const res = await login(credentials);

    if (!res.success) return;

    router.push('/mydashboard');
    setItem('userInfo', res.data.user);
    setItem('accessToken', res.data.accessToken);
  };

  const onClose = () => {
    if (state?.success === true) {
      handleCloseModal();
    } else {
      setIsModalOpen(false);
    }
  };

  return {
    formData,
    handleFormChange,
    handleIsChecked,
    handlePreventSpace,
    isPasswordVisible,
    toggleVisiblePassword,
    isFormComplete,
    handleFormSubmit,
    isModalOpen,
    onClose,
    state,
    isPending,
  };
}
