export const deleteFiles = async (urls: string[]): Promise<void> => {
  await Promise.all(
    urls.map(async (url) => {
      const response = await fetch("/api/file/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      if (!response.ok) {
        throw new Error("Ошибка удаления файла");
      }
    }),
  );
};
