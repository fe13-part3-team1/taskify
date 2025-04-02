import { PaginationControlsProps } from './type';
import ArrowIcon from '@/assets/icons/ArrowIcon';

export default function PaginationControls({
  currentPage,
  totalPages,
  showPageInfo = true,
  goToPrev,
  goToNext,
  justify = 'end',
}: PaginationControlsProps) {
  if (totalPages <= 1) return null;

  const justifyClass = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
  }[justify];

  const baseButtonClass =
    'border-gray300 flex h-9 w-9 md:h-10 md:w-10 items-center justify-center border bg-white';

  const getArrowColor = (disabled: boolean) => (disabled ? '#D9D9D9' : '#787486');

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <div className={`flex items-center gap-4 ${justifyClass}`}>
      {showPageInfo && (
        <span className="text-black200 text-regular14">
          {totalPages} 페이지 중 {currentPage}
        </span>
      )}
      <div className="flex">
        <button
          className={`${baseButtonClass} rounded-l-sm`}
          onClick={goToPrev}
          disabled={currentPage === 1}
        >
          <ArrowIcon width="7" height="12" color={getArrowColor(isPrevDisabled)} />
        </button>
        <button
          className={`${baseButtonClass} rounded-r-sm`}
          onClick={goToNext}
          disabled={currentPage === totalPages}
        >
          <ArrowIcon
            direction="right"
            width="7"
            height="12"
            color={getArrowColor(isNextDisabled)}
          />
        </button>
      </div>
    </div>
  );
}
