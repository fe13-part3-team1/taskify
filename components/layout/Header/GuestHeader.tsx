import Logo from '@/assets/icons/Logo';
import Link from 'next/link';

export default function GuestHeader() {
  return (
    <header className="sticky top-0 z-990 flex h-15 items-center justify-between bg-black px-6 md:h-17.5 md:px-10 lg:px-17.5">
      <Link href="/" className="hidden md:block">
        <Logo color="white" size="md" />
      </Link>
      <Link href="/" className="block md:hidden">
        <Logo color="white" size="sm" />
      </Link>
      <div className="text-regular14 md:text-regular16 flex gap-6 text-white md:gap-9">
        <Link href="/login">로그인</Link>
        <Link href="/signup">회원가입</Link>
      </div>
    </header>
  );
}
