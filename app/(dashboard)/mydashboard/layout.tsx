import UserHeader from '@/components/layout/Header/UserHeader';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <UserHeader title="내 대시보드" />
      <main>{children}</main>
    </>
  );
}
