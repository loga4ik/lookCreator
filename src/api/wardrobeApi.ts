type WardrobeItemType = {
  id: number;
  name: string;
  imgUrls: string[];
}

export const createWardrobeItem = async (
  name: string,
  imgUrls: string[],
): Promise<WardrobeItemType | Error> => {
  try {
    const response = await fetch("api/user/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        imgUrls,
      }),
    });

    if (!response.ok) {
      return new Error(`Ошибка запроса: ${await response.text()}`);
    }
    const res: WardrobeItemType = await response.json();

    return res;
  } catch (error) {
    return new Error("Ошибка запроса: " + error);
  }
};