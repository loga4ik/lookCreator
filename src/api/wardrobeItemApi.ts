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

type CreatedWardrobeItemType = {
  id: number;
  name: string;
  imgUrls: string[];
};

export const createWardrobeItem = async (
  name: string,
  categoryId: number | undefined,
  imgUrls: string[],
): Promise<CreatedWardrobeItemType | Error> => {
  try {
    const response = await fetch("/api/wardrobe-item/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        categoryId,
        imgUrls,
      }),
    });

    if (!response.ok) {
      return new Error(`Ошибка запроса: ${await response.text()}`);
    }

    const res: CreatedWardrobeItemType = await response.json();
    console.log(res);
    return res;
  } catch (error) {
    return new Error("Ошибка запроса: " + error);
  }
};

export const deleteWardrobeItem = async (
  id: number,
): Promise<true | Error> => {
  try {
    const response = await fetch(`/api/wardrobe-item/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      return new Error(`Ошибка запроса: ${await response.text()}`);
    }

    return true;
  } catch (error) {
    return new Error("Ошибка запроса: " + error);
  }
};
