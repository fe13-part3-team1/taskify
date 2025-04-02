import clsx from 'clsx';

interface Props {
  color: string;
  size?: number;
  className?: string;
}

export default function DashboardColorIcon({ color, size = 8, className }: Props) {
  return (
    <div
      className={clsx('shrink-0', className)}
      style={{
        width: size,
        height: size,
        borderRadius: size,
        backgroundColor: color,
      }}
    />
  );
}
