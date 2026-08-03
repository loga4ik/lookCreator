import type { ButtonHTMLAttributes } from "react";
import styles from "./IconButton.module.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  "aria-label": string;
};

export const IconButton = ({ active = false, className, type = "button", ...rest }: Props) => {
  const classes = [styles.iconBtn, active && styles.active, className].filter(Boolean).join(" ");
  return <button type={type} className={classes} {...rest} />;
};
