import Image from 'next/image';

interface ColorType {
  isSelected: string | null;
  colors: string[];
  onColorSelect: (color: string) => void;
}

export default function ColorPalette({ isSelected, colors, onColorSelect }: ColorType) {
  return (
    <div className="flex gap-2">
      {colors.map((color) => (
        <div key={color} className="relative cursor-pointer">
          <div
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onColorSelect(color)}
            className="h-[30px] w-[30px] rounded-full"
            style={{ backgroundColor: color }}
          />
          {isSelected === color && (
            <Image
              src="/icons/whiteCheck.svg"
              width={24}
              height={24}
              alt="check"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          )}
        </div>
      ))}
    </div>
  );
}
