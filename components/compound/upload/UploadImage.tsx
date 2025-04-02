import Input from '@/components/common/Input';
import React, { useRef } from 'react';
import Image from 'next/image';

interface UploadImageProps {
  image: string | null;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadImage = ({ image, onChange, id }: UploadImageProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const triggerFileInput = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    inputRef.current?.click();
  };

  return (
    <div className="relative h-full w-full">
      <Input
        type="file"
        id={id}
        customBorderClass="hidden"
        ref={inputRef}
        accept="image/*"
        onChange={onChange}
      />
      <button className="cursor-pointer rounded-lg" onClick={triggerFileInput}>
        {image ? (
          <Image src={image} alt="uploaded" fill className="rounded-lg" />
        ) : (
          <Image src="/upload-default-image.svg" alt="default" fill />
        )}
      </button>
    </div>
  );
};

export default UploadImage;
