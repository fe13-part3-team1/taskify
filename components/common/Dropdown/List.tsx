import { MenuOption, SearchableOption, SelectionOption } from '@/components/common/Dropdown/Item';
import { DropdownItem, SearchableDropdownItem } from '@/components/common/Dropdown/types';

interface ListProps {
  options: DropdownItem[];
  onClickItem: (option: DropdownItem) => void;
}

interface SelectionListProps extends ListProps {
  selected: DropdownItem | null;
}

interface SearchableListProps {
  options: SearchableDropdownItem[];
  onClickItem: (option: SearchableDropdownItem) => void;
  selected: SearchableDropdownItem | null;
}

export function MenuList({ options, onClickItem }: ListProps) {
  return (
    <ul className="border-gray300 absolute right-0 z-1 mt-1 flex max-h-40 w-fit min-w-24 flex-col items-stretch justify-start gap-1 overflow-y-auto rounded-md border bg-white px-1.5 py-2 drop-shadow-[0px_4px_20px_rgba(0,0,0,0.08)] filter">
      {options.map((option) => (
        <MenuOption key={option.id} option={option} onClickItem={onClickItem} />
      ))}
    </ul>
  );
}

export function SelectionList({ options, onClickItem, selected }: SelectionListProps) {
  return (
    <ul className="border-gray300 absolute right-0 z-1 mt-1 flex max-h-68 w-full min-w-24 flex-col items-stretch justify-start gap-1 overflow-y-auto rounded-md border bg-white px-1.5 py-2 drop-shadow-[0px_4px_20px_rgba(0,0,0,0.08)] filter">
      {options.map((option) => (
        <SelectionOption
          key={option.id}
          option={option}
          selected={selected}
          onClickItem={onClickItem}
        />
      ))}
    </ul>
  );
}

export function SearchableList({ options, onClickItem, selected }: SearchableListProps) {
  return (
    <ul className="border-gray300 absolute right-0 z-1 mt-1 flex max-h-68 w-full min-w-24 flex-col items-stretch justify-start gap-1 overflow-y-auto rounded-md border bg-white px-1.5 py-2 drop-shadow-[0px_4px_20px_rgba(0,0,0,0.08)] filter">
      {options.map((option) => (
        <SearchableOption
          key={option.id}
          option={option}
          selected={selected}
          onClickItem={onClickItem}
        />
      ))}
    </ul>
  );
}
