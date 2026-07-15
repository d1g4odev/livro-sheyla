export default function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 20"
      className={`h-4 w-40 ${className}`}
      fill="none"
      aria-hidden
    >
      <line x1="0" y1="10" x2="78" y2="10" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
      <line x1="122" y1="10" x2="200" y2="10" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
      <path
        d="M100 15.5c-3.6-2.6-7-5-7-8.2 0-2 1.6-3.5 3.5-3.5 1.4 0 2.7.8 3.5 2.2.8-1.4 2.1-2.2 3.5-2.2 1.9 0 3.5 1.5 3.5 3.5 0 3.2-3.4 5.6-7 8.2z"
        fill="currentColor"
      />
      <circle cx="86" cy="10" r="1.4" fill="currentColor" />
      <circle cx="114" cy="10" r="1.4" fill="currentColor" />
    </svg>
  );
}
