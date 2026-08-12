import { useEffect, useId, useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import styles from "./Autocomplete.module.css";
import type { DropDownOption } from "../DropDown/DropDown";

type Props = {
  options: DropDownOption[];
  value?: string;
  defaultValue?: string;
  isLoading?: boolean;
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
  debounceMs?: number;
  noResultsText?: string;
  className?: string;
  onChange?: (value: string) => void;
  onSelect?: (option: DropDownOption) => void;
};

export const Autocomplete = ({
  options,
  value,
  defaultValue = "",
  isLoading = false,
  placeholder,
  label,
  error,
  required,
  debounceMs = 300,
  noResultsText = "Совпадений не найдено",
  className,
  onChange,
  onSelect,
}: Props) => {
  const inputId = useId();
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const [internalValue, setInternalValue] = useState(defaultValue);
  const inputValue = value ?? internalValue;
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  useEffect(
    () => () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    },
    [],
  );

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const next = event.target.value;
    setInternalValue(next);
    setIsOpen(true);
    setHighlightedIndex(-1);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => onChange?.(next), debounceMs);
  };

  const handleSelect = (option: DropDownOption) => {
    setInternalValue(option.label);
    setIsOpen(false);
    setHighlightedIndex(-1);
    onSelect?.(option);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setIsOpen(false);
      return;
    }
    if (!isOpen || options.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((index) => (index + 1) % options.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((index) => (index <= 0 ? options.length - 1 : index - 1));
    } else if (event.key === "Enter" && highlightedIndex >= 0) {
      event.preventDefault();
      handleSelect(options[highlightedIndex]);
    }
  };

  const showPanel = isOpen && (isLoading || options.length > 0 || inputValue.length > 0);

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(" ")}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      <div className={styles.root} ref={rootRef}>
        <input
          id={inputId}
          type="text"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-invalid={Boolean(error)}
          autoComplete="off"
          className={[styles.field, error && styles.fieldError].filter(Boolean).join(" ")}
          placeholder={placeholder}
          value={inputValue}
          required={required}
          onChange={handleInput}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />

        {showPanel && (
          <ul id={listboxId} className={styles.panel} role="listbox">
            {isLoading ? (
              <li className={styles.status}>Поиск…</li>
            ) : options.length > 0 ? (
              options.map((option, index) => (
                <li key={option.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={index === highlightedIndex}
                    className={[styles.option, index === highlightedIndex && styles.optionHighlighted]
                      .filter(Boolean)
                      .join(" ")}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    onClick={() => handleSelect(option)}
                  >
                    {option.label}
                  </button>
                </li>
              ))
            ) : (
              <li className={styles.status}>{noResultsText}</li>
            )}
          </ul>
        )}
      </div>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
