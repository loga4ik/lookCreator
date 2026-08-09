"use client";
import type { KeyboardEvent } from "react";
import styles from "./ItemCard.module.css";
import { FavoriteButton } from "../IconButton/FavoriteButton";
import { HangerIcon } from "../icons/HangerIcon";

type Props = {
  imageUrl?: string;
  title: string;
  category: string;
  meta?: string;
  defaultFavorite?: boolean;
  onClick?: () => void;
};

export const ItemCard = ({ imageUrl, title, category, meta, defaultFavorite = false, onClick }: Props) => {
  const subtitle = meta ? `${category} · ${meta}` : category;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!onClick) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={styles.card}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.imageWrap}>
        {imageUrl ? (
          <img src={imageUrl} alt="" className={styles.image} />
        ) : (
          <div className={styles.imagePlaceholder}>
            <HangerIcon />
          </div>
        )}
        <div className={styles.favorite} onClick={(event) => event.stopPropagation()}>
          <FavoriteButton defaultFavorite={defaultFavorite} />
        </div>
      </div>

      <div className={styles.body}>
        <p className={styles.title}>{title}</p>
        <p className={styles.meta}>{subtitle}</p>
      </div>
    </div>
  );
};
