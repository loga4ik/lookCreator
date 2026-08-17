"use client";

import styles from "./FilterChips.module.css";
import { useState } from "react";

export type FilterOption = {
  value: string;
  label: string;
};

type Props = {
  options: FilterOption[];
  /** Управляемый режим - если передан (даже null), внутренний стейт не используется */
  value?: string | null;
  /** Неуправляемый режим - стартовое значение, как defaultSize в SizeSelector */
  defaultValue?: string | null;
  onChange?: (value: string | null) => void;
  /** Текст чипсы сброса фильтра. null - не показывать её вовсе */
  allLabel?: string | null;
  size?: "md" | "sm";
  "aria-label"?: string;
  className: string;
};

// Переиспользуемый чипс-фильтр в стиле SizeSelector (тот же паттерн
// управляемый/неуправляемый режим). Ничего не знает про домен (категории,
// зоны и т.д.) - просто список { value, label } и колбэк onChange.
// Годится и как один плоский ряд, и как второй уровень (size="sm") под ним.
export const FilterChips = ({
  options,
  value,
  defaultValue = null,
  onChange,
  allLabel = "Все",
  size = "md",
  "aria-label": ariaLabel = "Фильтр",
  className,
}: Props) => {
  const [internalValue, setInternalValue] = useState<string | null>(
    defaultValue,
  );
  const selected = value !== undefined ? value : internalValue;

  const handleSelect = (next: string | null) => {
    setInternalValue(next);
    onChange?.(next);
  };

  return (
    <div
      className={`${styles.filters} ${className}`}
      role="group"
      aria-label={ariaLabel}
    >
      {allLabel !== null && (
        <button
          type="button"
          className={[
            styles.chip,
            size === "sm" && styles.chipSm,
            selected === null && styles.active,
          ]
            .filter(Boolean)
            .join(" ")}
          aria-pressed={selected === null}
          onClick={() => handleSelect(null)}
        >
          {allLabel}
        </button>
      )}
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={[
            styles.chip,
            size === "sm" && styles.chipSm,
            selected === option.value && styles.active,
          ]
            .filter(Boolean)
            .join(" ")}
          aria-pressed={selected === option.value}
          onClick={() => handleSelect(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
