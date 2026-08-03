import { useState } from "react";
import { IconButton } from "./IconButton";
import { HeartIcon } from "../icons/HeartIcon";

type Props = {
  defaultFavorite?: boolean;
  favorite?: boolean;
  onToggle?: (favorite: boolean) => void;
};

export const FavoriteButton = ({ defaultFavorite = false, favorite, onToggle }: Props) => {
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
      aria-label={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
      aria-pressed={isFavorite}
    >
      <HeartIcon filled={isFavorite} />
    </IconButton>
  );
};
