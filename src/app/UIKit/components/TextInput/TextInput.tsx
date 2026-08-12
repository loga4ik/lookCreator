import { forwardRef, useId, type InputHTMLAttributes } from "react";
import styles from "./TextInput.module.css";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  wrapperClassName?: string;
};

export const TextInput = forwardRef<HTMLInputElement, Props>(
  (
    { label, error, required, id, className, wrapperClassName, ...rest },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className={`${(styles.wrapper) + " " + (wrapperClassName)}`}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type="text"
          required={required}
          aria-invalid={Boolean(error)}
          className={[styles.field, error && styles.fieldError, className]
            .filter(Boolean)
            .join(" ")}
          {...rest}
        />
        {error && <p className={styles.error}>{error}</p>}
      </div>
    );
  },
);

TextInput.displayName = "TextInput";
