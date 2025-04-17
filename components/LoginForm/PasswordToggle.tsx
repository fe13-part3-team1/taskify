import clsx from 'clsx';
import Open from '@/public/icons/openEye.svg';
import Close from '@/public/icons/closeEye.svg';

export default function PasswordToggle({
  isEyeOpen,
  onClick,
  className = '',
}: {
  isEyeOpen: boolean;
  onClick: (event: React.MouseEvent) => void;
  className?: string;
}) {
  return isEyeOpen ? (
    <Open onClick={onClick} className={clsx('cursor-pointer', className)} />
  ) : (
    <Close onClick={onClick} className={clsx('cursor-pointer', className)} />
  );
}
