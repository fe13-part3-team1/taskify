'use client';
import { useState, useRef } from 'react';
import Button from '@/components/common/Button';
import FormField from '@/components/compound/form/FormField';
import { validatePassword, validateEqualPassword } from '@/utils/authValidate';
import Modal from '@/components/common/Modal';
import { api } from '@/lib/api';

type PasswordUpdateResponse = { message?: string };

export default function ChangePasswordForm() {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isNewPasswordValid, setIsNewPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);

  const hasPasswordClickedRef = useRef<boolean>(false);
  const hasNewPasswordClickedRef = useRef<boolean>(false);
  const hasConfirmPasswordClickedRef = useRef<boolean>(false);

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
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-4 md:p-6">
        <h2 className="text-bold20 md:text-bold24">비밀번호 변경</h2>
        <div className="my-6 flex flex-col gap-4">
          <FormField
            id="password"
            name="password"
            type="password"
            label="현재 비밀번호"
            placeholder="현재 비밀번호 입력"
            fieldType="input"
            errorMessage="8자 이상 입력해 주세요."
            customLabelClass="text-regular14 md:text-regular16"
            onChange={(e) => setPassword(e.target.value)}
            onBlur={handlePasswordBlur}
            isValid={isPasswordValid}
            value={password}
          />
          <FormField
            id="newPassword"
            name="newPassword"
            type="password"
            label="새 비밀번호"
            placeholder="새 비밀번호 입력"
            fieldType="input"
            errorMessage="8자 이상 입력해 주세요."
            customLabelClass="text-regular14 md:text-regular16"
            onChange={(e) => setNewPassword(e.target.value)}
            onBlur={handleNewPasswordBlur}
            isValid={isNewPasswordValid}
            value={newPassword}
          />
          <FormField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="새 비밀번호 확인"
            placeholder="새 비밀번호 입력"
            fieldType="input"
            errorMessage="비밀번호가 일치하지 않습니다."
            customLabelClass="text-regular14 md:text-regular16"
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={handleConfirmPasswordBlur}
            isValid={isConfirmPasswordValid}
            value={confirmPassword}
          />
        </div>
        <Button type="submit" size="auth" disabled={!canSubmit} fullWidth={true}>
          변경
        </Button>
      </form>

      <Modal
        isOpen={isModalOpen}
        padding="64/40"
        borderRadius="16"
        submitMessage="확인"
        onClose={closeModal}
      >
        <div className="text-medium16 sm:text-medium20 flex w-full justify-center">
          {modalMessage}
        </div>
      </Modal>
    </>
  );
}
