export const COLOR_MAP = {
  green: '#7ac555', // css 변수로 참조
  purple: '#760dde',
  orange: '#ffa500',
  blue: '#76a5ea',
  pink: '#e876ea',
} as const;

// export const COLOR_MAP = {
//   green: 'var(--green)', // css 변수로 참조
//   purple: 'var(--purple)',
//   orange: 'var(--orange)',
//   blue: 'var(--blue)',
//   pink: 'var(--pink)',
// } as const;

type ColorKey = keyof typeof COLOR_MAP;

interface Props {
  colorKey: ColorKey;
  size?: number;
}

export default function DashboardColorIcon({ colorKey, size = 8 }: Props) {
  const resolvedColor = COLOR_MAP[colorKey];

  return (
    <div
      className="shrink-0"
      style={{
        width: size,
        height: size,
        borderRadius: size,
        backgroundColor: resolvedColor,
      }}
    />
  );
}
