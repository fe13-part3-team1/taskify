import clsx from 'clsx';
// import { createPortal } from 'react-dom';
import { borderRadiusCSS, paddingCSS, PaddingSize, RadiusSize } from './style';
import Button from '../Button';
import Portal from './Portal';

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
  onSubmit?: () => void;
  submitMessage?: string;
  cancelMessage?: string;
  padding: PaddingSize;
  borderRadius: RadiusSize;
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
}: ModalProps) {
  if (!isOpen) return null;

  const handleSubmitClick = () => {
    // if (onSubmit) {
    //   onSubmit();
    // }
    onSubmit?.();
    onClose();
  };

  const twoButton = cancelMessage && submitMessage;
  // const hasTwoButton = cancelMessage && submitMessage;
  // const buttonSize = hasTwoButton ? 'modal' : 'modalAlert';

  return (
    <Portal selector="#taskiy-modal-root">
      <>
        <div className="fixed top-0 left-0 z-[999] h-full w-full bg-black opacity-70" />
        <div
          className={clsx(
            'fixed top-1/2 left-1/2 z-[999] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center bg-white',
            cancelMessage || submitMessage ? 'gap-5' : 'gap-0',
            paddingCSS[padding],
            borderRadiusCSS[borderRadius]
          )}
        >
          {children}
          <div
            className={`flex gap-[7px] ${
              twoButton
                ? 'w-[80vw] max-w-[520px] min-w-[295px] md:w-[520px]'
                : 'w-[38vw] max-w-[240px] min-w-[192px] md:w-[240px]'
            }`}
          >
            {!!cancelMessage && (
              <Button
                variant="outline"
                // 변수화
                size={twoButton ? 'modal' : 'modalAlert'}
                onClick={onClose}
                fullWidth
              >
                {cancelMessage}
              </Button>
            )}

            {!!submitMessage && (
              <Button
                size={twoButton ? 'modal' : 'modalAlert'}
                onClick={handleSubmitClick}
                fullWidth
              >
                {submitMessage}
              </Button>
            )}
          </div>
        </div>
      </>
    </Portal>
  );

  // return createPortal(
  //   <>
  //     <div className="fixed top-0 left-0 z-[999] h-full w-full bg-black opacity-70" />
  //     <div
  //       className={clsx(
  //         'fixed top-1/2 left-1/2 z-[999] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center bg-white',
  //         cancelMessage || submitMessage ? 'gap-5' : 'gap-0',
  //         paddingCSS[padding],
  //         borderRadiusCSS[borderRadius]
  //       )}
  //     >
  //       {children}
  //       <div
  //         className={`flex gap-[7px] ${
  //           twoButton
  //             ? 'w-[80vw] max-w-[520px] min-w-[295px] md:w-[520px]'
  //             : 'w-[38vw] max-w-[240px] min-w-[192px] md:w-[240px]'
  //         }`}
  //       >
  //         {!!cancelMessage && (
  //           <Button
  //             variant="outline"
  //             // 변수화
  //             size={twoButton ? 'modal' : 'modalAlert'}
  //             onClick={onClose}
  //             fullWidth
  //           >
  //             {cancelMessage}
  //           </Button>
  //         )}

  //         {!!submitMessage && (
  //           <Button size={twoButton ? 'modal' : 'modalAlert'} onClick={handleSubmitClick} fullWidth>
  //             {submitMessage}
  //           </Button>
  //         )}
  //       </div>
  //     </div>
  //   </>,
  //   document.getElementById('modal-root')
  // );
}
