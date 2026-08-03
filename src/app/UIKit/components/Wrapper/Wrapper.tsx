import React, { ReactNode } from "react";
import styles from "./Wrapper.module.css";

type props = {
  className?: string;
  itemKey?: string;
  children: ReactNode;
  onClick?: () => void;
  lightShadow?: boolean;
  shadow?: boolean;
};

export const Wrapper: React.FC<props> = ({
  children,
  className,
  itemKey,
  onClick,
  lightShadow = false,
  shadow = true,
}) => {
  return (
    <div
      key={itemKey}
      className={`${styles.wrapper} ${shadow && lightShadow ? styles.lightShadow : ""} ${!shadow ? styles.noShadow : ""} ${className ?? ""}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
