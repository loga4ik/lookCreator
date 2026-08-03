import { useState } from "react";
import styles from "./SizeSelector.module.css";

type Props = {
  sizes: string[];
  defaultSize?: string;
  size?: string;
  onChange?: (size: string) => void;
};

export const SizeSelector = ({ sizes, defaultSize, size, onChange }: Props) => {
  const [internalSize, setInternalSize] = useState(defaultSize ?? sizes[0]);
  const selected = size ?? internalSize;

  const handleSelect = (value: string) => {
    setInternalSize(value);
    onChange?.(value);
  };

  return (
    <div className={styles.pills} role="group" aria-label="Выбор размера">
      {sizes.map((value) => (
        <button
          key={value}
          type="button"
          className={[styles.pill, value === selected && styles.selected].filter(Boolean).join(" ")}
          aria-pressed={value === selected}
          onClick={() => handleSelect(value)}
        >
          {value}
        </button>
      ))}
    </div>
  );
};
