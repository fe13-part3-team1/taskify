import Image from 'next/image';
import DateIcon from '@/public/icons/date.svg';
import UserBadge from '@/components/UserBadge/UserBadge';
import Tag from '@/components/Tag/Tag';
import { separateTagColor } from '@/utils/separateTagColor';
import { formatDate } from '@/utils/formatDateTime';
import DEFAULT_CARD_IMAGE from '@/constants/image/defaultCardImage';

interface CardProps {
  imageUrl: string;
  title: string;
  tags: string[];
  dueDate: string;
  profile: string | null;
}

export default function Card({ imageUrl, title, tags, dueDate, profile }: CardProps) {
  const tag = separateTagColor(tags);

  const defaultImage = imageUrl === DEFAULT_CARD_IMAGE;

  return (
    <div className="border-gray300 flex w-full cursor-pointer items-center justify-center rounded-md border border-solid bg-white p-3 sm:p-3 md:p-4 md:px-5 md:py-[18px]">
      <div className="flex w-full flex-col items-start justify-center gap-1 sm:flex-row sm:gap-5 lg:flex-col">
        {!defaultImage && (
          <div className="relative aspect-[260/152] h-auto w-full sm:h-[53px] sm:w-[90px] lg:h-40 lg:w-[274px]">
            <Image fill className="rounded-sm object-cover" src={imageUrl} alt="cardImage" />
          </div>
        )}
        <div className="flex w-full flex-col items-start justify-center gap-2.5">
          <h3 className="text-medium16">{title}</h3>
          <div className="flex w-full flex-col items-start justify-center gap-2.5 sm:flex-row lg:flex-col">
            <div className="flex gap-2">
              {tag.map((t) => (
                <Tag key={t.text} tag={t.text} color={t.color} />
              ))}
            </div>
            <div className="flex w-full items-center justify-between">
              <div className="border-gray300 flex items-center justify-center gap-1.5">
                <DateIcon width={18} height={18} alt="date" />
                <p className="text-gray500 text-medium12">{formatDate(dueDate)}</p>
              </div>
              <UserBadge size={24} profile={profile} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
