export default function AddBoxGrayIcon({
  width,
  height,
  className = '',
}: {
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7.37484 8.69364V11.402C7.37484 11.5793 7.43466 11.7278 7.55432 11.8475C7.67397 11.9672 7.82247 12.027 7.99982 12.027C8.17716 12.027 8.32566 11.9672 8.44532 11.8475C8.56497 11.7278 8.6248 11.5793 8.6248 11.402V8.69364H11.3331C11.5105 8.69364 11.659 8.63382 11.7786 8.51416C11.8983 8.39451 11.9581 8.24601 11.9581 8.06866C11.9581 7.89132 11.8983 7.74282 11.7786 7.62316C11.659 7.50351 11.5105 7.44369 11.3331 7.44369H8.6248V4.73533C8.6248 4.55798 8.56497 4.40948 8.44532 4.28983C8.32566 4.17018 8.17716 4.11035 7.99982 4.11035C7.82247 4.11035 7.67397 4.17018 7.55432 4.28983C7.43466 4.40948 7.37484 4.55798 7.37484 4.73533V7.44369H4.66648C4.48914 7.44369 4.34064 7.50351 4.22098 7.62316C4.10133 7.74282 4.0415 7.89132 4.0415 8.06866C4.0415 8.24601 4.10133 8.39451 4.22098 8.51416C4.34064 8.63382 4.48914 8.69364 4.66648 8.69364H7.37484ZM2.42292 15.152C2.00198 15.152 1.64567 15.0061 1.354 14.7145C1.06234 14.4228 0.916504 14.0665 0.916504 13.6456V2.49177C0.916504 2.07082 1.06234 1.71452 1.354 1.42285C1.64567 1.13118 2.00198 0.985352 2.42292 0.985352H13.5767C13.9977 0.985352 14.354 1.13118 14.6456 1.42285C14.9373 1.71452 15.0831 2.07082 15.0831 2.49177V13.6456C15.0831 14.0665 14.9373 14.4228 14.6456 14.7145C14.354 15.0061 13.9977 15.152 13.5767 15.152H2.42292ZM2.42292 13.902H13.5767C13.6408 13.902 13.6996 13.8753 13.753 13.8219C13.8064 13.7684 13.8332 13.7097 13.8332 13.6456V2.49177C13.8332 2.42766 13.8064 2.36889 13.753 2.31546C13.6996 2.26204 13.6408 2.23533 13.5767 2.23533H2.42292C2.35881 2.23533 2.30004 2.26204 2.24661 2.31546C2.19319 2.36889 2.16648 2.42766 2.16648 2.49177V13.6456C2.16648 13.7097 2.19319 13.7684 2.24661 13.8219C2.30004 13.8753 2.35881 13.902 2.42292 13.902Z"
        fill="#787486"
      />
    </svg>
  );
}
