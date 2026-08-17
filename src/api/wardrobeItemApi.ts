export type WardrobeItemType = {
  id: number;
  color: string;
  name: string;
  imageUrls: string[];
  createdAt: Date;
};
export type WardrobeItemsWithCategoryType = {
  categoryId: number;
  categoryName: string;
  items: WardrobeItemType[];
};

export const getUserWardrobeItems = async (
  signal?: AbortSignal,
): Promise<WardrobeItemsWithCategoryType[] | Error> => {
  const response = await fetch("/api/wardrobe-item", {
    cache: "no-store",
    signal,
  });

  if (!response.ok) {
    return new Error(`Ошибка запроса: ${await response.text()}`);
  }
  return await response.json();
};
