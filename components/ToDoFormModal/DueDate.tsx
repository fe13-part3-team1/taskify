import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale/ko';
import Input from '../common/Input';
import Calendar from '@/public/icons/date.svg';

registerLocale('ko', ko);

interface DueDateProps {
  onDueDateChange: (date: Date | null) => void;
  dueDate: Date | null;
}

export default function DueDate({ onDueDateChange, dueDate }: DueDateProps) {
  return (
    <div className="flex flex-col">
      <label className="text-medium18 text-black200 mb-2 flex items-center">마감일</label>
      <DatePicker
        locale="ko"
        className="w-full border-none outline-none"
        selected={dueDate}
        onChange={onDueDateChange}
        minDate={new Date()}
        showTimeSelect
        timeFormat="HH:mm"
        timeCaption="시간"
        dateFormat="yyyy.MM.dd HH:mm"
        placeholderText="날짜를 입력해 주세요"
        customInput={<Input leftIcon={<Calendar />} />}
      />
    </div>
  );
}
