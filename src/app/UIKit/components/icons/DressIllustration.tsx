type Props = {
  color: string;
  colorDeep: string;
};

export const DressIllustration = ({ color, colorDeep }: Props) => (
  <svg viewBox="0 0 100 140" fill="none" aria-hidden="true">
    <path
      d="M38 8 L30 26 L20 30 L14 60 L26 66 L22 132 L78 132 L74 66 L86 60 L80 30 L70 26 L62 8 Z"
      fill={color}
      opacity={0.9}
    />
    <path d="M38 8 C 42 18, 58 18, 62 8" stroke={colorDeep} strokeWidth={2} fill="none" />
  </svg>
);
