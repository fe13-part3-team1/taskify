import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { validateEmail, validatePassword } from '@/utils/authValidate';
import { setItem } from '@/utils/localstorage';
import ROUTES from '@/constants/routes';
import { useToggle } from '@/hooks/useToggle';

export default function useLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordVisible, toggle] = useToggle(false);
  const hasEmailClickedRef = useRef<boolean>(false);
  const hasPasswordClickedRef = useRef<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const canSubmit = isEmailValid && isPasswordValid;

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    hasEmailClickedRef.current = true;
    setIsEmailValid(validateEmail(e.target.value));
  };

  const handlePasswordBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    hasPasswordClickedRef.current = true;
    setIsPasswordValid(validatePassword(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await res.json();

    if (result.success) {
      router.push(ROUTES.MY_DASHBOARD);
      setItem('userInfo', result.data.user);
      setItem('accessToken', result.data.accessToken);
    } else {
      setModalMessage(result.message);
      setIsModalOpen(true);
      setIsLoading(false);
    }
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    isEmailValid,
    isPasswordValid,
    handleEmailBlur,
    handlePasswordBlur,
    hasEmailClickedRef,
    hasPasswordClickedRef,
    isPasswordVisible,
    toggle,
    isLoading,
    handleSubmit,
    canSubmit,
    isModalOpen,
    setIsModalOpen,
    modalMessage,
  };
}
