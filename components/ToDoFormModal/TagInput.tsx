import { useState } from 'react';
import ColorPalette from '../Dashboard/ColorPalette';
import Tag from '../Tag/Tag';
import { separateTagColor } from '@/utils/separateTagColor';

const COLORS = ['#ffa500', '#7ac555', '#76a5ea', '#ea91bc', '#787486'];

export default function TagInput({
  writtenTags,
  onChange,
}: {
  writtenTags?: string[];
  onChange: (tags: string[]) => void;
}) {
  const [isSelected, setIsSelected] = useState(COLORS[0]);
  const [tag, setTag] = useState('');
  const [tagList, setTagList] = useState<string[]>(writtenTags ?? []);
  const [isEqual, setIsEqual] = useState(false);

  const handleSelectColorClick = (color: string) => {
    setIsSelected(color);
  };

  const isEqualTag = tagList.some((t) => t.split('#')[0] === tag.trim());

  const handleTagChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;

    const TagAndColor = tag + isSelected;

    if (!isEqualTag && e.key === 'Enter' && tag.trim() !== '') {
      e.preventDefault();
      const updateTagList = [...tagList, TagAndColor];
      setTagList(updateTagList);
      onChange(updateTagList);
      setTag('');
    } else if (isEqualTag && e.key === 'Enter') {
      e.preventDefault();
      setIsEqual(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
    setIsEqual(false);
  };

  const handleTagDelete = (tagToDelete: string) => {
    setTagList(tagList.filter((t) => t !== tagToDelete));
  };

  const tags = separateTagColor(tagList);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-medium18 text-black200 flex items-center">
        태그
        <span className="text-gray400 text-regular12"> (더블 클릭 시 해당 태그는 삭제됩니다)</span>
      </label>
      <div
        className={`text-black200 border-gray300 flex h-[52px] w-full items-center gap-2 rounded-lg border px-4 py-3 ${isEqual ? 'border-red hover:border-red focus-within:border-red' : 'hover:border-violet focus-within:border-violet'}`}
      >
        {tags.map((t) => (
          <Tag
            key={t.text}
            tag={t.text}
            color={t.color}
            onDoubleClick={() => handleTagDelete(`${t.text}#${t.color}`)}
          />
        ))}
        <input
          value={tag}
          onChange={handleInputChange}
          onKeyDown={handleTagChange}
          placeholder={tags.length === 0 ? '입력 후 Enter' : ''}
          className="placeholder:text-gray400 w-full border-none outline-none focus:border-none"
        />
      </div>
      {isEqual && <span className="text-red text-regular14">이미 존재하는 태그입니다</span>}
      <ColorPalette
        isSelected={isSelected}
        colors={COLORS}
        onColorSelect={handleSelectColorClick}
      />
    </div>
  );
}
