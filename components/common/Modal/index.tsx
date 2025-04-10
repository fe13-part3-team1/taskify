import clsx from 'clsx';
import { createPortal } from 'react-dom';
import { borderRadiusCSS, paddingCSS, PaddingSize, RadiusSize } from './style';
import Button from '../Button';
import { useBlockScroll } from '@/hooks/useBlockScroll';

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
  onSubmit?: () => void;
  submitMessage?: string;
  cancelMessage?: string;
  padding: PaddingSize;
  borderRadius: RadiusSize;
  disabled?: boolean;
  ref?: React.RefObject<HTMLDivElement | null>;
}

export default function Modal({
  isOpen,
  children,
  onClose,
  onSubmit,
  submitMessage,
  cancelMessage,
  padding,
  borderRadius,
  disabled,
  ref,
}: ModalProps) {
  useBlockScroll(isOpen);
  if (!isOpen) return null;

  const handleSubmitClick = () => {
    onSubmit?.();
    onClose();
  };

  const twoButton = cancelMessage && submitMessage;

  return createPortal(
    <>
      <div className="fixed top-0 left-0 z-[998] h-full w-full bg-black opacity-70" />
      <div
        className={clsx(
          'fixed top-1/2 left-1/2 z-[999] -translate-x-1/2 -translate-y-1/2 flex-col bg-white',
          cancelMessage || submitMessage ? 'gap-5' : 'gap-0',
          paddingCSS[padding],
          'max-h-[90vh] overflow-y-auto',
          borderRadiusCSS[borderRadius]
        )}
        ref={ref}
      >
        {children}
        <div
          className={`mt-8 flex gap-[7px] ${
            twoButton
              ? 'w-[80vw] max-w-[520px] min-w-[295px] md:w-[520px]'
              : 'w-[38vw] max-w-[240px] min-w-[192px] md:w-[240px]'
          }`}
        >
          {cancelMessage && (
            <Button
              variant="outline"
              size={twoButton ? 'modal' : 'modalAlert'}
              onClick={onClose}
              fullWidth
            >
              {cancelMessage}
            </Button>
          )}
          {submitMessage && (
            <Button
              size={twoButton ? 'modal' : 'modalAlert'}
              onClick={handleSubmitClick}
              fullWidth
              disabled={disabled}
            >
              {submitMessage}
            </Button>
          )}
        </div>
      </div>
    </>,
    document.body
  );
}
