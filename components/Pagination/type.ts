export interface PaginationItemsProps<T> {
  data: T[];
  itemsPerPage: number;
  wrapperClassName?: string;
  currentPage: number;
  renderFixedItem?: () => React.ReactNode;
  /**
   * @example
   * renderItems={(pageItems) => (
   *   <ul>
   *     {pageItems.map(item => (
   *       <li key={item.id}>{item.title}</li>
   *     ))}
   *   </ul>
   * )}
   */
  renderItems: (pageItems: T[]) => React.ReactNode;

  /**
   * Custom pagination controls (Optional)
   */
  renderControls?: (controlsProps: PaginationControlsProps) => React.ReactNode;
}

export interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  showPageInfo?: boolean;
  goToPrev: () => void;
  goToNext: () => void;
}
