import Open from '@/public/icons/openEye.svg';
import Close from '@/public/icons/closeEye.svg';

const PasswordToggleBtn = (props: { isVisible: boolean; onClick: () => void }) => {
  const { isVisible, onClick } = props;

  const PasswordToggleIcon = isVisible ? Open : Close;

  return <PasswordToggleIcon onClick={onClick} className="cursor-pointer" />;
};

export default PasswordToggleBtn;
