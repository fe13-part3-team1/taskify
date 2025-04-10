import CheckIcon from '@/public/icons/check.svg';

interface CheckBoxProps {
  handleIsChecked: () => void;
  isChecked: boolean;
}

export default function CheckBox({ isChecked, handleIsChecked }: CheckBoxProps) {
  return (
    <label className="relative flex w-[180px] cursor-pointer items-center justify-start gap-2">
      <input
        type="checkbox"
        name="isChecked"
        className="peer absolute h-5 w-5 cursor-pointer opacity-0"
        checked={isChecked}
        onChange={handleIsChecked}
      />
      <div className="border-gray300 h-5 w-5 cursor-pointer rounded-sm border border-solid" />
      <CheckIcon
        width={20}
        height={20}
        alt="check"
        className="absolute hidden peer-checked:block"
      />
      <span className="text-regular16 text-black200 select-none">이용약관에 동의합니다.</span>
    </label>
  );
}
