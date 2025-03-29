import { useMemo } from 'react';
import { PaginationItemsProps } from './type';

export default function PaginationItems<T>({
  data,
  itemsPerPage,
  renderFixedItem,
  renderItems,
  wrapperClassName,
  currentPage,
}: PaginationItemsProps<T>) {
  const currentItems = useMemo(() => {
    if (currentPage === 1) {
      const count = renderFixedItem ? itemsPerPage - 1 : itemsPerPage;
      return data.slice(0, count);
    }

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  }, [data, currentPage, itemsPerPage, renderFixedItem]);

  return (
    <div className={wrapperClassName}>
      {currentPage === 1 && renderFixedItem?.()}
      {renderItems(currentItems)}
    </div>
  );
}

/** 💡 PaginationItems & PaginationControls 사용 예시
 *
 * 필요 시 커스터마이징 가능한 props 목록:
 * - wrapperClassName: 전체 컨테이너 스타일
 * - renderFixedItem?: 첫 페이지에 고정적으로 노출할 요소
 *
 * 사용자는 페이지 상태와 컨트롤 핸들러를 직접 정의하고 전달해야 합니다.
 */

// const [currentPage, setCurrentPage] = useState(1);
// const itemsPerPage = ; // 한 페이지당 아이템 수
// const totalPages = Math.ceil(데이터.length / itemsPerPage);

// const goToPrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
// const goToNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

// return (
//   <PaginationItems
//     data={데이터}
//     itemsPerPage={itemsPerPage}
//     currentPage={currentPage}
//     renderItems={(pageItems) => (
//       <>
//         {pageItems.map((item) => (
//           <div key={item.id} {...item} />
//         ))}
//       </>
//     )}
//     {...props}  // 커스터마이징 시 필요한 옵션 전달
//   />

// <PaginationControls
//   currentPage={currentPage}
//   totalPages={totalPages}
//   goToPrev={goToPrev}
//   goToNext={goToNext}
// />
// )
