'use client';

import { redirect } from 'next/navigation';
import CheckBox from './CheckBox';
import FormField from '../compound/form/FormField';
import Button from '../common/Button';
import Modal from '../common/Modal';
import useSignupForm from './useSignupForm';
import Open from '@/public/icons/openEye.svg';
import Close from '@/public/icons/closeEye.svg';

export default function SignupForm() {
  const {
    formData,
    handleFormChange,
    handleIsChecked,
    handlePreventSpace,
    isPasswordVisible,
    toggleVisiblePassword,
    isNotFormEmpty,
    state,
    formAction,
    isPending,
  } = useSignupForm();

  const INPUT = [
    {
      label: '이메일',
      name: 'email',
      type: 'text',
      placeholder: '이메일을 입력해 주세요',
      value: formData.email,
    },
    {
      label: '닉네임',
      name: 'nickname',
      type: 'text',
      placeholder: '닉네임을 입력해 주세요',
      value: formData.nickname,
    },
    {
      label: '비밀번호',
      name: 'password',
      type: isPasswordVisible.password ? 'text' : 'password',
      placeholder: '8자 이상 입력해 주세요',
      value: formData.password,
      isPassword: true,
    },
    {
      label: '비밀번호 확인',
      name: 'checkPassword',
      type: isPasswordVisible.checkPassword ? 'text' : 'password',
      placeholder: '비밀번호를 한번 더 입력해 주세요',
      value: formData.checkPassword,
      isPassword: true,
    },
  ];

  return (
    <form action={formAction} className="flex w-full flex-col gap-6">
      <Modal
        isOpen={(state && state.status) || false}
        padding="64/40"
        borderRadius="16"
        submitMessage="확인"
        onClose={() => redirect('/login')}
      >
        가입이 완료되었습니다!
      </Modal>
      <div className="flex flex-col gap-4">
        {INPUT.map((input) => (
          <div key={input.label} className="relative">
            <FormField
              name={input.name}
              type={input.type}
              value={input.value}
              label={input.label}
              placeholder={input.placeholder}
              onChange={handleFormChange}
              onKeyDown={handlePreventSpace}
              isValid={state?.field !== input.name}
              errorMessage={state?.field === input.name ? state.err : ''}
              fieldType="input"
            />
            {input.isPassword &&
              (isPasswordVisible[input.name] ? (
                <Open
                  onClick={() => toggleVisiblePassword(input.name)}
                  className="absolute top-[70%] right-4 -translate-y-1/2 cursor-pointer"
                />
              ) : (
                <Close
                  onClick={() => toggleVisiblePassword(input.name)}
                  className="absolute top-[70%] right-4 -translate-y-1/2 cursor-pointer"
                />
              ))}
          </div>
        ))}
        <CheckBox isChecked={formData.isChecked} handleIsChecked={handleIsChecked} />
      </div>
      <Button disabled={isPending || isNotFormEmpty} type="submit" fullWidth size="auth">
        {isPending ? '...' : '가입하기'}
      </Button>
    </form>
  );
}
