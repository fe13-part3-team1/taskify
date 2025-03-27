import { ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
  children: ReactNode;
  selector?: string;
}

const Portal = ({ children, selector }: PortalProps) => {
  const [element, setElement] = useState<Element | null>(null);

  useEffect(() => {
    if (!selector) return;
    setElement(document.querySelector(selector));
  }, [selector]);

  if (!element) return null;
  return ReactDOM.createPortal(children, element);
};

export default Portal;
