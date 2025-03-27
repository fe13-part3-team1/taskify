import React from 'react';
import { getFontSize, getBorderClasses } from './styles';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isValid?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: 16 | 14;
  disabled?: boolean;
  customBorderClass?: string;
  customInputClass?: string;
  ref?: React.Ref<HTMLInputElement>;
}

const Input = ({
  leftIcon = null,
  rightIcon = null,
  isValid = true,
  size = 16,
  disabled = false,
  customBorderClass = '',
  customInputClass = '',
  ref,
  ...props
}: InputProps) => {
  return (
    <div
      className={`flex items-center gap-2 rounded-lg ${getBorderClasses(disabled, isValid)} px-4 py-3 ${customBorderClass}`}
    >
      {leftIcon}
      <input
        className={`w-full border-none text-[var(--color-black200)] outline-none placeholder:text-[var(--color-gray400)] ${getFontSize(size)} ${customInputClass}`}
        ref={ref}
        disabled={disabled}
        {...props}
      />
      {rightIcon}
    </div>
  );
};

export default Input;
