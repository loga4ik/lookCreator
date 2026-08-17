import { useCallback, useState } from "react";
import { deleteFiles } from "../UIKit/components/FileInput/deleteFiles";
import { saveFiles } from "../UIKit/components/FileInput/saveFiles";

type UseImgsUploadOptions = {
  isSingle?: boolean;
};

export const useImgsUpload = ({
  isSingle = true,
}: UseImgsUploadOptions = {}) => {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [imgUrls, setImgUrls] = useState<string[]>([]);
  const [isAvatarUploading, setIsAvatarUploading] = useState(false);

  const handleAvatarChange = async (files: File[]) => {
    if (files.length === 0) {
      setImgUrl(null);
      setImgUrls([]);
      return;
    }
    setIsAvatarUploading(true);
    try {
      if (isSingle) {
        const [url] = await saveFiles(files[0]);
        setImgUrl(url);
      } else {
        const urls = await saveFiles(files);
        setImgUrls(urls);
      }
    } catch (error) {
      console.error(error);
      setImgUrl(null);
      setImgUrls([]);
    } finally {
      setIsAvatarUploading(false);
    }
  };

  const deleteUploadedImg = useCallback(async (url: string) => {
    try {
      await deleteFiles([url]);
    } catch (error) {
      console.error(error);
    } finally {
      setImgUrl((prev) => (prev === url ? null : prev));
      setImgUrls((prev) => prev.filter((savedUrl) => savedUrl !== url));
    }
  }, []);

  return {
    imgUrl,
    imgUrls,
    isAvatarUploading,
    handleAvatarChange,
    deleteUploadedImg,
  };
};
