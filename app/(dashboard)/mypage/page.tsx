import Link from 'next/link';
import ProfileEditForm from '@/app/(dashboard)/mypage/ProfileEditForm';
import ChangePasswordForm from '@/app/(dashboard)/mypage/ChangePasswordForm';
import ArrowIcon from '@/assets/icons/ArrowIcon';

export default function Page() {
  return (
    <div className="w-full max-w-[680px] px-3 py-4 md:p-4 lg:p-5">
      <Link href="/mydashboard" className="mb-5 flex w-fit items-center gap-2 md:hidden">
        <ArrowIcon width="16" height="16" />
        <span className="text-medium14 text-black200">돌아가기</span>
      </Link>
      <Link href="/mydashboard" className="mb-5 hidden w-fit items-center gap-2 md:flex">
        <ArrowIcon width="18" height="18" />
        <span className="text-medium16 text-black200">돌아가기</span>
      </Link>
      <div className="flex flex-col gap-4 md:gap-6">
        <ProfileEditForm />
        <ChangePasswordForm />
      </div>
    </div>
  );
}
