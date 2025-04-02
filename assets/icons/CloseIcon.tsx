export default function CloseIcon({
  width = '24',
  height = '24',
  color = '#6B6B6B',
  className,
}: {
  width?: string;
  height?: string;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17 7L7 17" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 7L17 17" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
