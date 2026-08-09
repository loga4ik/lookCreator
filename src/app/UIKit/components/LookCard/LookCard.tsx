"use client";
// потом будет клиентским
import styles from "./LookCard.module.css";
import { DressIllustration } from "../icons/DressIllustration";
import { FavoriteButton } from "../IconButton/FavoriteButton";

// export type ProductColor = {
//   name: string;
//   value: string;
//   deep: string;
// };

type Props = {
  title: string;
  description: string;
  // colors: ProductColor[];
  defaultFavorite?: boolean;
};

export const LookCard = ({
  title,
  description,
  // colors,
  defaultFavorite = false,
}: Props) => {
  // const [colorIndex, setColorIndex] = useState(0);
  const active = {
    name: "Розовый",
    value: "var(--rose)",
    deep: "var(--rose-deep)",
  };
  const colors = [
    {
      name: "Лавандовый",
      value: "var(--lavender)",
      deep: "var(--lavender-deep)",
    },
    { name: "Розовый", value: "var(--rose)", deep: "var(--rose-deep)" },
    { name: "Золотой", value: "var(--gold)", deep: "var(--gold-deep)" },
  ];
  return (
    <div className={styles.card}>
      <div className={styles.art}>
        <DressIllustration color={active.value} colorDeep={active.deep} />
      </div>

      <div className={styles.top}>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{description}</p>

        <div className={styles.dots} role="group" aria-label="Выбор цвета">
          {/* тут потом будет цветовая гамма лука */}
          {colors.map((color) => (
            <button
              key={color.name}
              type="button"
              className={[styles.dot].filter(Boolean).join(" ")}
              style={{ background: color.value }}
              aria-label={color.name}
            />
          ))}
        </div>
      </div>

      <div className={styles.favorite}>
        <FavoriteButton defaultFavorite={defaultFavorite} />
      </div>
    </div>
  );
};
