import CreateDashboardModal from '@/app/(dashboard)/mydashboard/CreateDashboardModal';
import AddBoxIcon from '@/assets/icons/AddBoxIcon';
import { useModal } from '@/hooks/useModal';

export default function AddDashboardButton() {
  const { isOpen, open, close } = useModal();
  return (
    <>
      <button type="button" className="m-[3px] mx-auto md:mr-0" onClick={open}>
        <AddBoxIcon width="14" height="14" />
      </button>

      <CreateDashboardModal isOpen={isOpen} onClose={close} />
    </>
  );
}
