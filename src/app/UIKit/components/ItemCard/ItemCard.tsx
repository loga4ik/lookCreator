"use client";
import { useEffect, useState, type KeyboardEvent } from "react";
import styles from "./ItemCard.module.css";
import { FavoriteButton } from "../IconButton/FavoriteButton";
import { HangerIcon } from "../icons/HangerIcon";
import { Carousel } from "../Carousel/Carousel";

type Props = {
  images?: string[];
  title: string;
  category: string;
  meta?: string;
  defaultFavorite?: boolean;
  className?: string;
  onClick?: () => void;
};

export const ItemCard = ({
  images = [],
  title,
  category,
  meta,
  defaultFavorite = false,
  className,
  onClick,
}: Props) => {
  const subtitle = meta ? `${category} · ${meta}` : category;
  const firstImage = images[0];
  const [measuredRatio, setMeasuredRatio] = useState<number | null>(null);
  const aspectRatio = firstImage ? measuredRatio : null;

  useEffect(() => {
    if (!firstImage) return;
    let isCancelled = false;
    const image = new Image();
    image.onload = () => {
      if (!isCancelled) {
        setMeasuredRatio(image.naturalWidth / image.naturalHeight);
      }
    };
    image.src = firstImage;
    return () => {
      isCancelled = true;
    };
  }, [firstImage]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!onClick) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={[styles.card, className].filter(Boolean).join(" ")}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <div
        className={styles.imageWrap}
        style={aspectRatio ? { aspectRatio: `${aspectRatio}` } : undefined}
      >
        {images.length ? (
          <Carousel images={images} />
        ) : (
          <div className={styles.imagePlaceholder}>
            <HangerIcon />
          </div>
        )}
        <div className={styles.favorite} onClick={(event) => event.stopPropagation()}>
          <FavoriteButton
            defaultFavorite={defaultFavorite}
            style={{ boxShadow: "none" }}
          />
        </div>
      </div>

      <div className={styles.body}>
        <p className={styles.title}>{title}</p>
        <p className={styles.meta}>{subtitle}</p>
      </div>
    </div>
  );
};
