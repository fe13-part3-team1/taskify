import UserHeader from '@/components/layout/Header/UserHeader';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <UserHeader title="계정관리" />
      <main>{children}</main>
    </>
  );
}
