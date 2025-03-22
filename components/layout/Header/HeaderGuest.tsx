import Logo from '@/assets/icons/Logo';
import Link from 'next/link';

export default function HeaderGuest() {
  return (
    <header className="flex h-17.5 items-center justify-between bg-black px-6 md:px-10 lg:px-17.5">
      <Link href="/" className="hidden md:block">
        <Logo color="white" size="md" />
      </Link>
      <Link href="/" className="block md:hidden">
        <Logo color="white" size="sm" />
      </Link>
      <div className="text-regular14 flex gap-6 text-white md:gap-9 md:text-base md:font-normal">
        <Link href="/login">로그인</Link>
        <Link href="/signup">회원가입</Link>
      </div>
    </header>
  );
}
