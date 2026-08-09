import type { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
};

export const Button = ({
  variant = "secondary",
  size = "md",
  fullWidth = false,
  className,
  type = "button",
  ...rest
}: Props) => {
  const classes = [
    styles.btn,
    styles[size],
    variant === "primary" && styles.primary,
    variant === "ghost" && styles.ghost,
    fullWidth && styles.fullWidth,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <button type={type} className={classes} {...rest} />;
};
