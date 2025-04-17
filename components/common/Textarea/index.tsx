import React from 'react';
import { getFontSize, getBorderClasses } from '@/components/common/Input/styles';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: number;
  rows?: number;
  disabled?: boolean;
  isValid?: boolean;
  customBorderClass?: string;
  customTextareaClass?: string;
}
const Textarea = ({
  size = 16,
  rows = 4,
  disabled = false,
  isValid = true,
  customBorderClass = '',
  customTextareaClass = '',
  ...props
}: TextareaProps) => {
  return (
    <div
      className={`${getBorderClasses(disabled, isValid)} rounded-lg border px-4 py-3 ${customBorderClass}`}
    >
      <textarea
        className={`${getFontSize(size)} w-full resize-none border-none outline-none placeholder:${getFontSize(size)} placeholder:text-gray400 ${customTextareaClass}`}
        rows={rows}
        {...props}
      />
    </div>
  );
};

export default Textarea;
