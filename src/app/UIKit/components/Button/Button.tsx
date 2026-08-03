import type { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  fullWidth?: boolean;
};

export const Button = ({
  variant = "secondary",
  fullWidth = false,
  className,
  type = "button",
  ...rest
}: Props) => {
  const classes = [
    styles.btn,
    variant === "primary" && styles.primary,
    variant === "ghost" && styles.ghost,
    fullWidth && styles.fullWidth,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <button type={type} className={classes} {...rest}/>;
};
