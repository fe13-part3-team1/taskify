import clsx from 'clsx';

interface TagProps {
  tag: string;
  color: string;
  onDoubleClick?: () => void;
  readonly?: boolean;
}

export default function Tag({ tag, color, onDoubleClick, readonly }: TagProps) {
  const tagColor: { [key: string]: string } = {
    ffa500: 'bg-[#f9eee3]',
    '7ac555': 'bg-[#f4faf1]',
    '76a5ea': 'bg-[#dbe6f7]',
    ea91bc: 'bg-[#f7dbf0]',
    '787486': 'bg-[#eeeeee]',
  };

  return (
    <div
      onDoubleClick={readonly ? undefined : onDoubleClick}
      className={clsx(
        'rounded-sm px-1.5 py-0.5 whitespace-nowrap',
        readonly ? 'cursor-default' : 'cursor-pointer',
        tagColor[color]
      )}
    >
      <span style={{ color: `#${color}` }}>{tag}</span>
    </div>
  );
}
