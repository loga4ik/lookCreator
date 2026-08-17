import { useState } from "react";
import { saveFiles } from "../UIKit/components/FileInput/saveFiles";

type UseAvatarUploadOptions = {
  isSingle?: boolean;
};

export const useAvatarUpload = ({
  isSingle = true,
}: UseAvatarUploadOptions = {}) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarUrls, setAvatarUrls] = useState<string[]>([]);
  const [isAvatarUploading, setIsAvatarUploading] = useState(false);

  const handleAvatarChange = async (files: File[]) => {
    if (files.length === 0) {
      setAvatarUrl(null);
      setAvatarUrls([]);
      return;
    }
    setIsAvatarUploading(true);
    try {
      if (isSingle) {
        const [url] = await saveFiles(files[0]);
        setAvatarUrl(url);
      } else {
        const urls = await saveFiles(files);
        setAvatarUrls(urls);
      }
    } catch (error) {
      console.error(error);
      setAvatarUrl(null);
      setAvatarUrls([]);
    } finally {
      setIsAvatarUploading(false);
    }
  };

  return { avatarUrl, avatarUrls, isAvatarUploading, handleAvatarChange };
};
