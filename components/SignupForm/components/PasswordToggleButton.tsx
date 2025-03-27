'use client';

import React from 'react';
import Open from '@/public/icons/openEye.svg';
import Close from '@/public/icons/closeEye.svg';

const PasswordToggleButton = (props: { isVisible: boolean; onClick: () => void }) => {
  const { isVisible, onClick } = props;

  const PasswordToggleButtonIcon = isVisible ? Open : Close;

  return (
    <PasswordToggleButtonIcon
      onClick={onClick}
      className="absolute top-[70%] right-4 -translate-y-1/2 cursor-pointer"
    />
  );
};

export default PasswordToggleButton;
