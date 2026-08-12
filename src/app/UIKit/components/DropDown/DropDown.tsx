import { useEffect, useId, useRef, useState } from "react";
import styles from "./DropDown.module.css";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";

export type DropDownOption = {
  value: string;
  label: string;
};

type Props = {
  options: DropDownOption[];
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
  value?: string;
  defaultValue?: string;
  className?: string;
  onChange?: (value: string) => void;
};

export const DropDown = ({
  options,
  placeholder = "Выберите значение",
  label,
  error,
  required,
  value,
  defaultValue,
  className,
  onChange,
}: Props) => {
  const triggerId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const selectedValue = value ?? internalValue;
  const selectedOption = options.find((option) => option.value === selectedValue);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (option: DropDownOption) => {
    setInternalValue(option.value);
    onChange?.(option.value);
    setIsOpen(false);
  };

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(" ")}>
      {label && (
        <label htmlFor={triggerId} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      <div className={styles.root} ref={rootRef}>
        <button
          id={triggerId}
          type="button"
          className={[styles.trigger, isOpen && styles.triggerOpen, error && styles.triggerError]
            .filter(Boolean)
            .join(" ")}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-invalid={Boolean(error)}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className={[styles.value, !selectedOption && styles.placeholder].filter(Boolean).join(" ")}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDownIcon />
        </button>

        {isOpen && (
          <ul className={styles.panel} role="listbox">
            {options.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={option.value === selectedValue}
                  className={[styles.option, option.value === selectedValue && styles.optionSelected]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
