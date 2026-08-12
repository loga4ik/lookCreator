"use client";
import { FormEvent, useState } from "react";
import { TextInput } from "../../UIKit/components/TextInput/TextInput";
import { FileInput } from "../../UIKit/components/FileInput/FileInput";
import { useAvatarUpload } from "../../registration/useAvatarUpload";
import { Button } from "../../UIKit/components/Button/Button";

export const CreateItemForm = () => {
  const [titleState, setTitleState] = useState("");
  const { avatarUrls, isAvatarUploading, handleAvatarChange } =
    useAvatarUpload({ isSingle: false });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(titleState);
    console.log(avatarUrls);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center center m-1.5 gap-y-10"
    >
      <TextInput
        placeholder="название"
        onChange={(e) => setTitleState(e.target.value)}
        wrapperClassName="w-full"
      />
      <FileInput
        label="фото вещи"
        className="w-full"
        hint={isAvatarUploading ? "Загрузка..." : undefined}
        accept="image/*"
        multiple={true}
        onFilesChange={handleAvatarChange}
      />
      <Button type="submit" className="btn btn-outline">
        отправить
      </Button>
    </form>
  );
};
