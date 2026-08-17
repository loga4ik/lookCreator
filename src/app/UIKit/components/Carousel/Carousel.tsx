"use client";
import { useState, type MouseEvent } from "react";
import styles from "./Carousel.module.css";
import { ChevronLeftIcon } from "../icons/ChevronLeftIcon";
import { ChevronRightIcon } from "../icons/ChevronRightIcon";

type Props = {
  images: string[];
  alt?: string;
  className?: string;
};

export const Carousel = ({ images, alt = "", className }: Props) => {
  const [index, setIndex] = useState(0);

  if (images.length === 0) return null;

  const hasMultiple = images.length > 1;

  const goTo = (event: MouseEvent, next: number) => {
    event.stopPropagation();
    setIndex((next + images.length) % images.length);
  };

  return (
    <div className={[styles.carousel, className].filter(Boolean).join(" ")}>
      <div
        className={styles.track}
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, slideIndex) => (
          <div className={styles.slide} key={src + slideIndex}>
            <img src={src} alt={alt} />
          </div>
        ))}
      </div>

      {hasMultiple && (
        <>
          <button
            type="button"
            className={[styles.navBtn, styles.navPrev].join(" ")}
            aria-label="Предыдущее фото"
            onClick={(event) => goTo(event, index - 1)}
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            className={[styles.navBtn, styles.navNext].join(" ")}
            aria-label="Следующее фото"
            onClick={(event) => goTo(event, index + 1)}
          >
            <ChevronRightIcon />
          </button>

          <div className={styles.dots}>
            {images.map((src, dotIndex) => (
              <button
                key={src + dotIndex}
                type="button"
                className={[styles.dot, dotIndex === index && styles.dotActive]
                  .filter(Boolean)
                  .join(" ")}
                aria-label={`Фото ${dotIndex + 1}`}
                aria-current={dotIndex === index}
                onClick={(event) => goTo(event, dotIndex)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
