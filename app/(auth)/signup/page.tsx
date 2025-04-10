import Link from 'next/link';
import SignupForm from '@/components/SignupForm/components/SignupForm';

export default function Signup() {
  return (
    <div className="flex flex-col items-center justify-center">
      <span className="text-medium20 mb-[30px] max-sm:mb-9">첫 방문을 환영합니다!</span>
      <SignupForm />
      <div className="text-regular16 mt-6 flex items-center justify-center gap-2">
        <span>이미 회원이신가요?</span>
        <Link href={'/login'} className="text-violet underline">
          로그인하기
        </Link>
      </div>
    </div>
  );
}
