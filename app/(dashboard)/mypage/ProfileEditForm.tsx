'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import FormField from '@/components/compound/form/FormField';
import UploadImage from '@/components/compound/upload/UploadImage';
import { validateLimitLengthNickname } from '@/utils/authValidate';
import { useState } from 'react';
import { getItem, setItem } from '@/utils/localstorage';
import INTERNAL_API from '@/constants/api/internal';

type userInfo = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export default function ProfileEditForm() {
  const router = useRouter();
  const userInfo = getItem<userInfo>('userInfo');
  const email = userInfo?.email ?? '';
  const initialNickname = userInfo?.nickname ?? '';
  const initalProfileImageUrl = userInfo?.profileImageUrl ?? null;
  const [imagePreview, setImagePreview] = useState<string | null>(initalProfileImageUrl);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [nickname, setNickname] = useState(initialNickname);
  const [isNicknameValid, setIsNicknameValid] = useState(true);

  const canSubmit = isNicknameValid && !(nickname === initialNickname && imageFile === null);

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleNicknameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsNicknameValid(validateLimitLengthNickname(e.target.value));
  };

  const uploadProfileImage = async (imageFile: File) => {
    const token = getItem('accessToken');
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me/image`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('이미지 업로드에 실패했습니다.');
    }

    const data = await response.json();
    return data;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let uploadedImageUrl: string | null = null;

    if (imageFile) {
      const { profileImageUrl } = await uploadProfileImage(imageFile);
      uploadedImageUrl = profileImageUrl;
    }

    const response = await fetch(`${INTERNAL_API.USER.ME}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nickname: nickname,
        profileImageUrl: uploadedImageUrl,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      return;
    }

    setItem('userInfo', data?.userInfo);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-4 md:p-6">
      <h2 className="text-bold20 text-black200 md:text-bold24">프로필</h2>
      <div className="my-6 flex flex-col md:flex-row">
        <div className="mb-10 size-25 md:mr-10 md:mb-0 md:size-[180px] md:basis-[180px]">
          <UploadImage id="profileImageUrl" image={imagePreview} onChange={handleChangeImage} />
        </div>
        <div className="w-full md:flex-1">
          <div className="mb-6 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className={`text-black200 text-regular14 md:text-regular16`}>이메일</label>
              <div className="text-gray400 text-regular16 border-gray300 hover:border-violet focus-within:border-violet truncate rounded-lg border-1 px-4 py-3 transition-colors">
                {email}
              </div>
            </div>
            <FormField
              id="nickname"
              name="nickname"
              type="text"
              label="닉네임"
              placeholder="닉네임"
              fieldType="input"
              errorMessage="닉네임을 입력해 주세요."
              customLabelClass="text-regular14 md:text-regular16"
              onChange={(e) => setNickname(e.target.value)}
              onBlur={handleNicknameBlur}
              isValid={isNicknameValid}
              value={nickname}
            />
          </div>
          <Button type="submit" size="auth" disabled={!canSubmit} fullWidth={true}>
            저장
          </Button>
        </div>
      </div>
    </form>
  );
}
