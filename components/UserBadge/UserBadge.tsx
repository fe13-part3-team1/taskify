import Image from 'next/image';
import clsx from 'clsx';
import UserIcon from '@/assets/icons/UserIcon';

type FontSize = 'M16' | 'R14' | 'R16';

interface BadgeProps {
  size: number;
  gap?: number;
  profile?: string | null;
  userName?: string;
  fontSize?: FontSize;
  responsive?: boolean;
}

export default function UserBadge({
  size,
  gap,
  profile,
  userName,
  fontSize,
  responsive,
}: BadgeProps) {
  const fontSizeCSS: Record<FontSize, string> = {
    M16: 'text-medium16',
    R14: 'text-regular14',
    R16: 'text-regular16',
  };

  return (
    <div className="flex items-center justify-center" style={{ gap: `${gap}px` }}>
      {profile ? (
        <Image
          src={profile}
          width={size}
          height={size}
          alt="user"
          style={{ width: size, height: size }}
          className="rounded-full border border-white bg-white object-cover"
        />
      ) : (
        <UserIcon width={size} height={size} />
      )}
      {userName && (
        <span
          className={clsx(
            fontSize && fontSizeCSS[fontSize],
            responsive && 'max-sm:hidden',
            'bg-white'
          )}
        >
          {userName}
        </span>
      )}
    </div>
  );
}
