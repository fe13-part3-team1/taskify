import ProfileEditForm from '@/app/(dashboard)/mypage/ProfileEditForm';
import ChangePasswordForm from '@/app/(dashboard)/mypage/ChangePasswordForm';
import BackLink from '@/components/BackLink/BackLink';
import ROUTES from '@/constants/routes';

export default function Page() {
  return (
    <div className="w-full max-w-[680px] px-3 py-4 md:p-4 lg:p-5">
      <BackLink backUrl={ROUTES.MY_DASHBOARD} />
      <div className="mt-5 flex flex-col gap-4 md:gap-6">
        <ProfileEditForm />
        <ChangePasswordForm />
      </div>
    </div>
  );
}
