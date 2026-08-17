type CategoryType = {
  id: number;
  name: string;
}

export const searchCategories = async (
  name: string,
): Promise<CategoryType[] | Error> => {
  try {
    const response = await fetch("/api/category/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });
    console.log(response);
    
    if (!response.ok) {
      return new Error(`Ошибка запроса: ${await response.text()}`);
    }
    const res: CategoryType[] = await response.json();
    return res;
  } catch (error) {
    return new Error("Ошибка запроса: " + error);
  }
};