import type { MouseEventHandler, ReactNode } from "react";
import styles from "./Wrapper.module.css";

type Props = {
  className?: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
  shadowOut?: boolean;
  shadow?: boolean;
};

export const Wrapper = ({
  children,
  className,
  onClick,
  shadowOut = true,
  shadow = true,
}: Props) => {
  const classes = [
    styles.wrapper,
    shadow && !shadowOut && styles.shadowIn,
    !shadow && styles.noShadow,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
};
