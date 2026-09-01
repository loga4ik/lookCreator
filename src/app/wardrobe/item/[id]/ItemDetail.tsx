"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./ItemDetail.module.css";
import { Wrapper } from "../../../UIKit/components/Wrapper/Wrapper";
import { ItemCard } from "../../../UIKit/components/ItemCard/ItemCard";
import { Carousel } from "../../../UIKit/components/Carousel/Carousel";
import { FavoriteButton } from "../../../UIKit/components/IconButton/FavoriteButton";
import { ChevronLeftIcon } from "../../../UIKit/components/icons/ChevronLeftIcon";
import { HangerIcon } from "../../../UIKit/components/icons/HangerIcon";
import {
  deleteWardrobeItem,
  getUserWardrobeItems,
  WardrobeItemsWithCategoryType,
  WardrobeItemType,
} from "@/src/api/wardrobeItemApi";
import { Button } from "@/src/app/UIKit/components/Button/Button";

type Props = { id: number };

type FoundItem = WardrobeItemType & {
  categoryId: number;
  categoryName: string;
};

export const ItemDetail = ({ id }: Props) => {
  const router = useRouter();
  const [groups, setGroups] = useState<WardrobeItemsWithCategoryType[] | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    getUserWardrobeItems(abortController.signal)
      .then((result) => {
        if (result instanceof Error) {
          setGroups([]);
          return;
        }
        setGroups(result);
      })
      .catch((error) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        console.error(error);
        setGroups([]);
      })
      .finally(() => setLoading(false));
    return () => abortController.abort();
  }, []);

  if (loading) {
    return <p className={styles.state}>Загрузка...</p>;
  }

  const item: FoundItem | undefined = groups
    ?.flatMap((group) =>
      group.items.map((wardrobeItem) => ({
        ...wardrobeItem,
        categoryId: group.categoryId,
        categoryName: group.categoryName,
      })),
    )
    .find((wardrobeItem) => wardrobeItem.id === id);

  if (!groups || !item) {
    return (
      <div className={styles.state}>
        <p>Вещь не найдена</p>
        <Link href="/wardrobe" className={styles.backLink}>
          <ChevronLeftIcon />
          Назад к гардеробу
        </Link>
      </div>
    );
  }

  const similarItems =
    groups
      .find((group) => group.categoryId === item.categoryId)
      ?.items.filter((wardrobeItem) => wardrobeItem.id !== item.id)
      .slice(0, 4) ?? [];

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await deleteWardrobeItem(item.id);
    if (result instanceof Error) {
      console.error(result);
      setIsDeleting(false);
      return;
    }
    router.push("/wardrobe");
  };

  return (
    <div className="mx-15 my-5">
      <Link href="/wardrobe" className={styles.backLink}>
        <ChevronLeftIcon />
        Назад к гардеробу
      </Link>

      <Wrapper shadowOut={false} className={styles.detailCard}>
        <div className={styles.gallery}>
          {item.imageUrls.length ? (
            <Carousel images={item.imageUrls} alt={item.name} />
          ) : (
            <div className={styles.placeholder}>
              <HangerIcon />
            </div>
          )}
        </div>
        <div className={styles.info}>
          <div className={styles.favorite}>
            <FavoriteButton />
          </div>
          <h1 className={styles.title}>{item.name}</h1>
          <div className={styles.fields}>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Категория</span>
              <span className={styles.fieldValue}>{item.categoryName}</span>
            </div>
            {item.color && (
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Цвет</span>
                <span className={styles.fieldValue}>{item.color}</span>
              </div>
            )}
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Бренд</span>
              <span className={styles.fieldValueMuted}>
                пока не реализовано
              </span>
            </div>
            <Button
              variant="ghost"
              className="bottom-0 w-fit right-0 absolute"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Удаление..." : "Удалить"}
            </Button>
          </div>
        </div>
      </Wrapper>

      {similarItems.length > 0 && (
        <div className={styles.similarSection}>
          <Wrapper className="py-1 px-3 mt-5 flex text-sm justify-between text-muted">
            <p>похожие вещи</p>
            <p>{similarItems.length} вещи</p>
          </Wrapper>
          <div className={styles.similarGrid}>
            {similarItems.map((similar) => (
              <ItemCard
                key={similar.id}
                images={similar.imageUrls}
                title={similar.name}
                category={item.categoryName}
                onClick={() => router.push(`/wardrobe/item/${similar.id}`)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
