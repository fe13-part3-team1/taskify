'use client';

import { redirect } from 'next/navigation';
import CheckBox from './CheckBox';
import FormField from '../compound/form/FormField';
import Button from '../common/Button';
import Modal from '../common/Modal';
import useSignupForm from './useSignupForm';
// import Open from '@/public/icons/openEye.svg';
// import Close from '@/public/icons/closeEye.svg';
import PasswordToggleButton from './components/PasswordToggleButton';
// import { useMemo } from 'react';

const INPUT_FIELD_LIST = [
  {
    label: '이메일',
    name: 'email',
    placeholder: '이메일을 입력해 주세요',
  },
  {
    label: '닉네임',
    name: 'nickname',
    placeholder: '닉네임을 입력해 주세요',
  },
  {
    label: '비밀번호',
    name: 'password',
    placeholder: '8자 이상 입력해 주세요',
  },
  {
    label: '비밀번호 확인',
    name: 'checkPassword',
    placeholder: '비밀번호를 한번 더 입력해 주세요',
  },
] as const;

const INPUT_FIELD_TYPE = {
  TEXT: 'text',
  PASSWORD: 'password',
} as const;

export default function SignupForm() {
  const {
    formData,
    handleFormChange,
    handleIsChecked,
    handlePreventSpace,
    isPasswordVisible,
    toggleVisiblePassword,
    isFormIncomplete,
    handleFormSubmit,
    state,
    isPending,
  } = useSignupForm();

  // const inputFieldList = [
  //   {
  //     label: '이메일',
  //     name: 'email',
  //     type: 'text',
  //     placeholder: '이메일을 입력해 주세요',
  //     value: formData.email,
  //   },
  //   {
  //     label: '닉네임',
  //     name: 'nickname',
  //     type: 'text',
  //     placeholder: '닉네임을 입력해 주세요',
  //     value: formData.nickname,
  //   },
  //   {
  //     label: '비밀번호',
  //     name: 'password',
  //     type: isPasswordVisible.password ? 'text' : 'password',
  //     placeholder: '8자 이상 입력해 주세요',
  //     value: formData.password,
  //     isPassword: true,
  //   },
  //   {
  //     label: '비밀번호 확인',
  //     name: 'checkPassword',
  //     type: isPasswordVisible.checkPassword ? 'text' : 'password',
  //     placeholder: '비밀번호를 한번 더 입력해 주세요',
  //     value: formData.checkPassword,
  //     isPassword: true,
  //   },
  // ];

  // const inputFiledList = useMemo(() => {
  //   return [
  //     {
  //       label: '이메일',
  //       name: 'email',
  //       type: 'text',
  //       placeholder: '이메일을 입력해 주세요',
  //       value: formData.email,
  //     },
  //     {
  //       label: '닉네임',
  //       name: 'nickname',
  //       type: 'text',
  //       placeholder: '닉네임을 입력해 주세요',
  //       value: formData.nickname,
  //     },
  //     {
  //       label: '비밀번호',
  //       name: 'password',
  //       type: isPasswordVisible.password ? 'text' : 'password',
  //       placeholder: '8자 이상 입력해 주세요',
  //       value: formData.password,
  //       isPassword: true,
  //     },
  //     {
  //       label: '비밀번호 확인',
  //       name: 'checkPassword',
  //       type: isPasswordVisible.checkPassword ? 'text' : 'password',
  //       placeholder: '비밀번호를 한번 더 입력해 주세요',
  //       value: formData.checkPassword,
  //       isPassword: true,
  //     },
  //   ];
  // }, [formData, isPasswordVisible]);

  return (
    <form onSubmit={handleFormSubmit} className="flex w-full flex-col gap-6">
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
        {INPUT_FIELD_LIST.map((input) => {
          const { label, name: inputName, placeholder } = input;

          const isPasswordInput = ['password', 'checkPassword'].includes(inputName);
          const isPasswordValueVisible = isPasswordVisible[inputName];

          const isInputFieldValid = state?.field === inputName;

          return (
            <div key={label} className="relative">
              <FormField
                name={inputName}
                type={isPasswordInput ? INPUT_FIELD_TYPE.PASSWORD : INPUT_FIELD_TYPE.TEXT}
                value={formData[inputName]}
                label={label}
                placeholder={placeholder}
                onChange={handleFormChange}
                onKeyDown={handlePreventSpace}
                isValid={!isInputFieldValid}
                errorMessage={isInputFieldValid ? state.err : ''}
                fieldType="input"
              />
              {isPasswordInput && (
                <PasswordToggleButton
                  isVisible={isPasswordValueVisible}
                  onClick={() => toggleVisiblePassword(inputName)}
                />
              )}
            </div>
          );
        })}

        {/* 디렉토리 구조 */}
        {/* {INPUT.map((input) => (
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
        ))} */}

        {/* 변수명 isChecked */}
        {/* 변수명 isAFealkfjklaejfChecked  */}
        <CheckBox isChecked={formData.isChecked} handleIsChecked={handleIsChecked} />
      </div>
      <Button disabled={isPending || isFormIncomplete} type="submit" fullWidth size="auth">
        {isPending ? '...' : '가입하기'}
      </Button>
    </form>
  );
}
