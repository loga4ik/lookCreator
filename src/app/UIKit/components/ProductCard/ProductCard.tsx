import { useState } from "react";
import styles from "./ProductCard.module.css";
import { DressIllustration } from "../icons/DressIllustration";
import { SizeSelector } from "../SizeSelector/SizeSelector";
import { FavoriteButton } from "../IconButton/FavoriteButton";
import { Button } from "../Button/Button";

export type ProductColor = {
  name: string;
  value: string;
  deep: string;
};

type Props = {
  title: string;
  fabric: string;
  price: number;
  colors: ProductColor[];
  sizes: string[];
  defaultSize?: string;
  defaultFavorite?: boolean;
  onAddToCart?: () => void;
};

const formatPrice = (price: number) =>
  `${new Intl.NumberFormat("ru-RU").format(price)} ₽`;

export const ProductCard = ({
  title,
  fabric,
  price,
  colors,
  sizes,
  defaultSize,
  defaultFavorite = false,
  onAddToCart,
}: Props) => {
  const [colorIndex, setColorIndex] = useState(0);
  const active = colors[colorIndex];

  return (
    <div className={styles.card}>
      <div className={styles.art}>
        <DressIllustration color={active.value} colorDeep={active.deep} />
      </div>

      <div className={styles.top}>
        <div>
          <p className={styles.title}>{title}</p>
          <p className={styles.fabric}>{fabric}</p>
        </div>
        <p className={styles.price}>{formatPrice(price)}</p>
      </div>

      <div className={styles.dots} role="group" aria-label="Выбор цвета">
        {colors.map((color, index) => (
          <button
            key={color.name}
            type="button"
            className={[styles.dot, index === colorIndex && styles.dotSelected]
              .filter(Boolean)
              .join(" ")}
            style={{ background: color.value }}
            aria-label={color.name}
            aria-pressed={index === colorIndex}
            onClick={() => setColorIndex(index)}
          />
        ))}
      </div>

      <div className={styles.sizes}>
        <SizeSelector sizes={sizes} defaultSize={defaultSize} />
      </div>

      <div className={styles.footer}>
        <FavoriteButton defaultFavorite={defaultFavorite} />
        <Button variant="primary" onClick={onAddToCart}>
          В корзину
        </Button>
      </div>
    </div>
  );
};
