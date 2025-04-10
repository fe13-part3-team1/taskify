import React from 'react';
import Input from '@/components/common/Input';
import Textarea from '@/components/common/Textarea';
import { getFontSize } from '@/components/common/Input/styles';
import { FormFieldProps, InputSpecificProps, TextareaSpecificProps } from './type';
const FormField = (props: FormFieldProps) => {
  const {
    fieldType,
    label,
    id,
    required = false,
    isValid = true,
    errorMessage,
    errorMessageFontSize = 14,
    customLabelClass = '',
    ...restProps
  } = props;

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className={`text-medium18 flex items-center gap-[2px] ${customLabelClass}`}
      >
        {label}
        {required && <span className="text-violet">*</span>}
      </label>

      {fieldType === 'input' ? (
        <Input id={id} isValid={isValid} {...(restProps as InputSpecificProps)} />
      ) : (
        <Textarea id={id} isValid={isValid} {...(restProps as TextareaSpecificProps)} />
      )}

      {!isValid && (
        <span className={`text-red ${getFontSize(errorMessageFontSize)}`}>{errorMessage}</span>
      )}
    </div>
  );
};

export default FormField;
