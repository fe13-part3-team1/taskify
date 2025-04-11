'use client';
import Button from '@/components/common/Button';
import FormField from '@/components/compound/form/FormField';
import Modal from '@/components/common/Modal';
import useChangePasswordForm from '@/app/(dashboard)/mypage/useChangePasswordForm';

export default function ChangePasswordForm() {
  const {
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
    resetForm,
  } = useChangePasswordForm();

  return (
    <>
      <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-4 md:p-6">
        <h2 className="text-bold20 text-black200 md:text-bold24">비밀번호 변경</h2>
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
            disabled={isLoading}
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
            disabled={isLoading}
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
            disabled={isLoading}
          />
        </div>
        <Button type="submit" size="auth" disabled={!canSubmit || isLoading} fullWidth={true}>
          변경
        </Button>
      </form>

      <Modal
        isOpen={isModalOpen}
        padding="64/40"
        borderRadius="16"
        submitMessage="확인"
        onClose={() => {
          closeModal();
          resetForm();
        }}
      >
        <div className="text-black200 text-medium16 sm:text-medium20 flex w-full justify-center">
          {modalMessage}
        </div>
      </Modal>
    </>
  );
}
