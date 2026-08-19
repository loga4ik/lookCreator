"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import { IconButton } from "./IconButton";
import { HeartIcon } from "../icons/HeartIcon";

type Props = {
  defaultFavorite?: boolean;
  favorite?: boolean;
  onToggle?: (favorite: boolean) => void;
  className?: string;
  style?: CSSProperties;
};

export const FavoriteButton = ({
  defaultFavorite = false,
  favorite,
  onToggle,
  className,
  style,
}: Props) => {
  const [internalFavorite, setInternalFavorite] = useState(defaultFavorite);
  const isFavorite = favorite ?? internalFavorite;

  const handleClick = () => {
    const next = !isFavorite;
    setInternalFavorite(next);
    onToggle?.(next);
  };

  return (
    <IconButton
      active={isFavorite}
      onClick={handleClick}
      className={className}
      style={style}
      aria-label={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
      aria-pressed={isFavorite}
    >
      <HeartIcon filled={isFavorite} />
    </IconButton>
  );
};
