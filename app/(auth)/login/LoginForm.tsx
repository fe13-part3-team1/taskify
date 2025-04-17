'use client';

import FormField from '@/components/compound/form/FormField';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import PasswordToggle from '@/components/LoginForm/PasswordToggle';
import useLoginForm from './useLoginForm';

export default function LoginForm() {
  const {
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
  } = useLoginForm();

  return (
    <>
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4 lg:gap-6">
        <div className="flex flex-col gap-2 lg:gap-4">
          <FormField
            id="email"
            name="email"
            fieldType="input"
            label="이메일"
            type="email"
            placeholder="이메일을 입력해 주세요"
            errorMessage="이메일 형식으로 작성해 주세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleEmailBlur}
            isValid={!hasEmailClickedRef.current || isEmailValid}
            disabled={isLoading}
          />
          <FormField
            id="password"
            name="password"
            fieldType="input"
            label="비밀번호"
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder="비밀번호를 입력해 주세요"
            errorMessage="8자 이상 작성해 주세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={handlePasswordBlur}
            isValid={!hasPasswordClickedRef.current || isPasswordValid}
            rightIcon={<PasswordToggle isEyeOpen={!isPasswordVisible} onClick={() => toggle()} />}
            disabled={isLoading}
          />
        </div>
        <Button size="auth" fullWidth={true} type="submit" disabled={isLoading || !canSubmit}>
          로그인
        </Button>
      </form>

      <Modal
        isOpen={isModalOpen}
        padding="64/40"
        borderRadius="16"
        submitMessage="확인"
        onClose={() => setIsModalOpen(false)}
      >
        <div className="text-medium16 sm:text-medium20 flex w-full justify-center">
          {modalMessage}
        </div>
      </Modal>
    </>
  );
}
