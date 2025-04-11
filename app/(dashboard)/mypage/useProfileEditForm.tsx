import { useRouter } from 'next/navigation';
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

export default function useProfileEditForm() {
  const router = useRouter();
  const userInfo = getItem<userInfo>('userInfo');
  const email = userInfo?.email ?? '';
  const initialNickname = userInfo?.nickname ?? '';
  const initalProfileImageUrl = userInfo?.profileImageUrl ?? null;
  const [imagePreview, setImagePreview] = useState<string | null>(initalProfileImageUrl);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [nickname, setNickname] = useState(initialNickname);
  const [isNicknameValid, setIsNicknameValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

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
        profileImageUrl: uploadedImageUrl ?? initalProfileImageUrl,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      setIsLoading(false);
      return;
    }

    setImageFile(null);
    setImagePreview(data?.userInfo.profileImageUrl);
    setItem('userInfo', data?.userInfo);
    setIsLoading(false);
    router.refresh();
  };

  return {
    email,
    nickname,
    imagePreview,
    setNickname,
    isNicknameValid,
    handleNicknameBlur,
    handleChangeImage,
    canSubmit,
    handleSubmit,
    isLoading,
  };
}
