import { useState, useRef } from 'react';
import { validatePassword, validateEqualPassword } from '@/utils/authValidate';
import { api } from '@/lib/api';

type PasswordUpdateResponse = { message?: string };

export default function useChangePasswordForm() {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isNewPasswordValid, setIsNewPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);

  const hasPasswordClickedRef = useRef<boolean>(false);
  const hasNewPasswordClickedRef = useRef<boolean>(false);
  const hasConfirmPasswordClickedRef = useRef<boolean>(false);

  const [isLoading, setIsLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const canSubmit =
    hasPasswordClickedRef.current &&
    hasNewPasswordClickedRef.current &&
    hasConfirmPasswordClickedRef.current &&
    isPasswordValid &&
    isNewPasswordValid &&
    isConfirmPasswordValid;

  const handlePasswordBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    hasPasswordClickedRef.current = true;
    setIsPasswordValid(validatePassword(e.target.value));
  };

  const handleNewPasswordBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    hasNewPasswordClickedRef.current = true;
    setIsNewPasswordValid(validatePassword(e.target.value));
    setIsConfirmPasswordValid(validateEqualPassword(e.target.value, confirmPassword));
  };

  const handleConfirmPasswordBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    hasConfirmPasswordClickedRef.current = true;
    setIsConfirmPasswordValid(validateEqualPassword(newPassword, e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await api.put<PasswordUpdateResponse>(`/auth/password`, {
      password: password,
      newPassword: newPassword,
    });

    if ('message' in res && res.message) {
      setIsModalOpen(true);
      setModalMessage(res.message);
    } else {
      setIsModalOpen(true);
      setModalMessage('비밀번호가 변경되었습니다.');
    }

    setIsLoading(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return {
    password,
    newPassword,
    confirmPassword,
    setPassword,
    setNewPassword,
    setConfirmPassword,
    handlePasswordBlur,
    handleNewPasswordBlur,
    handleConfirmPasswordBlur,
    isPasswordValid,
    isNewPasswordValid,
    isConfirmPasswordValid,
    canSubmit,
    handleSubmit,
    isLoading,
    isModalOpen,
    closeModal,
    modalMessage,
  };
}
