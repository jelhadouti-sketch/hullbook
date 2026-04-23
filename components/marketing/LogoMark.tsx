export function LogoMark({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M3 20 C3 20, 8 26, 16 26 C24 26, 29 20, 29 20 L26 12 L6 12 Z"
        fill="#B8812E"
        stroke="#0E3B5C"
        strokeWidth="2"
      />
      <path d="M16 4 L16 12 M16 4 L22 12" stroke="#0E3B5C" strokeWidth="2" />
      <path
        d="M3 20 Q10 22, 16 20 T29 20"
        stroke="#2C6E8F"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}
