import Button from '@/components/common/Button';
import People from '@/public/icons/people.svg';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="mb-10 flex flex-col gap-15">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-violet text-[200px] font-extrabold">
            4<span className="text-violet-300">0</span>4
          </h1>
          <h2 className="text-violet -mt-10 mb-5 text-3xl font-bold">Not Found</h2>
          <h3 className="text-black200 mb-7 text-5xl font-bold">
            페이지가 없거나 접근할 수 없어요
          </h3>
          <Link href="/">
            <Button variant="ghost" size="auth" className="border-violet border-2">
              Taskify 홈으로 &gt;
            </Button>
          </Link>
        </div>
        <People alt="not found" />
      </div>
    </div>
  );
}
