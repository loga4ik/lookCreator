"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Wrapper } from "../UIKit/components/Wrapper/Wrapper";
import { Button } from "../UIKit/components/Button/Button";
import { ItemCard } from "../UIKit/components/ItemCard/ItemCard";
import {
  getUserWardrobeItems,
  WardrobeItemsWithCategoryType,
} from "@/src/api/wardrobeItemApi";
import {
  FilterChips,
  FilterOption,
} from "../UIKit/components/FilterChips/FilterChips";

export const WardrobeItems = () => {
  const router = useRouter();
  const [wardrobeItems, setWardrobeItems] = useState<
    WardrobeItemsWithCategoryType[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    getUserWardrobeItems(abortController.signal)
      .then((result) => {
        console.log(result);

        if (result instanceof Error) {
          console.error(result.message);
          setWardrobeItems([]);
          return;
        }
        setWardrobeItems(result);
      })
      .catch((error) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        console.error(error);
      });

    return () => {
      abortController.abort();
    };
  }, []);

  const wardrobeCategoryes: FilterOption[] = [
    ...new Map(
      wardrobeItems.map((item) => [
        item.categoryId,
        { value: `${item.categoryId}`, label: item.categoryName },
      ]),
    ).values(),
  ];

  const visibleItems = wardrobeItems
    .filter(
      (category) =>
        !selectedCategory || `${category.categoryId}` === selectedCategory,
    )
    .flatMap((category) =>
      category.items.map((item) => ({
        ...item,
        categoryName: category.categoryName,
      })),
    );

  return (
    <>
      <FilterChips
        options={wardrobeCategoryes}
        onChange={setSelectedCategory}
        className="mt-5"
      />
      <div className="columns-2 sm:columns-3 xl:columns-4 gap-3 py-8 px-6">
        <Wrapper
          shadowOut={false}
          className="flex items-center justify-center rounded-2xl p-10 aspect-square break-inside-avoid mb-3"
        >
          {/* потом можно поменять на модалку */}
          <Link href="/wardrobe/createItem">
            <Button className="bg-primary">Добавить вещь</Button>
          </Link>
        </Wrapper>
        {visibleItems.map((item) => (
          <ItemCard
            images={item.imageUrls}
            title={item.name}
            category={item.categoryName}
            key={item.id}
            onClick={() => router.push(`/wardrobe/item/${item.id}`)}
          />
        ))}
      </div>
    </>
  );
};
