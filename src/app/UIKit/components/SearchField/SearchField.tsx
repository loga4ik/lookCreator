import type { InputHTMLAttributes } from "react";
import styles from "./SearchField.module.css";
import { SearchIcon } from "../icons/SearchIcon";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const SearchField = ({ label = "Поиск", className, ...rest }: Props) => (
  <label className={[styles.field, className].filter(Boolean).join(" ")}>
    <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}>
      {label}
    </span>
    <SearchIcon />
    <input type="text" {...rest} />
  </label>
);
