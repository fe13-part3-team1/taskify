import { useEffect } from 'react';

export function useBlockScroll(isOpen: boolean) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
}
