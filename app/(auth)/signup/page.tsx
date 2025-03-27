import Link from 'next/link';
import SignupForm from '@/components/SignupForm/SignupForm';

export const CLIENT_ROUTES = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  // ... 다른 경로들
} as const;

export default function Signup() {
  return (
    <div className="text-black200 flex flex-col items-center justify-center">
      <span className="text-medium20 mb-[30px] max-sm:mb-9">첫 방문을 환영합니다!</span>
      <SignupForm />

      <div className="text-regular16 mt-6 flex items-center justify-center gap-2">
        <span className="text-black200">이미 회원이신가요?</span>

        {/* c: 경로 상수화 */}
        <Link href={CLIENT_ROUTES.LOGIN} className="text-violet underline">
          로그인하기
        </Link>
      </div>
    </div>
  );
}
