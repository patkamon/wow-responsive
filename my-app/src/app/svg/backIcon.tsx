interface Props {
  color?: string;
}

export default function BackIcon({ color = "#243831" }: Props) {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.3398 8.40674H1.33984M1.33984 8.40674L8.33984 15.4067M1.33984 8.40674L8.33984 1.40674"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
