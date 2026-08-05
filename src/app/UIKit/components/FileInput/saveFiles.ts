export const saveFiles = async (
  files: File[] | File,
): Promise<string[]> => {
    const filesArray = Array.isArray(files) ? files : [files];
    const uploadPromises = filesArray.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/file/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Ошибка загрузки файла");
      }
      const result = await response.json();
      return result.url;
    });
    return Promise.all(uploadPromises);
};
