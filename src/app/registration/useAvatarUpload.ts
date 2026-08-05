import { useState } from "react";
import { saveFiles } from "../UIKit/components/FileInput/saveFiles";

export const useAvatarUpload = () => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isAvatarUploading, setIsAvatarUploading] = useState(false);

  const handleAvatarChange = async (files: File[]) => {
    const file = files[0];
    if (!file) {
      setAvatarUrl(null);
      return;
    }
    setIsAvatarUploading(true);
    try {
      const [url] = await saveFiles(file, true);
      setAvatarUrl(url);
    } catch (error) {
      console.error(error);
      setAvatarUrl(null);
    } finally {
      setIsAvatarUploading(false);
    }
  };

  return { avatarUrl, isAvatarUploading, handleAvatarChange };
};
