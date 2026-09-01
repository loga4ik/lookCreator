"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { TextInput } from "../../UIKit/components/TextInput/TextInput";
import { FileInput } from "../../UIKit/components/FileInput/FileInput";
import { useImgsUpload } from "../../registration/useImgsUpload";
import { Button } from "../../UIKit/components/Button/Button";
import { Autocomplete } from "../../UIKit/components/Autocomplete/Autocomplete";
import { DropDownOption } from "../../UIKit/components/DropDown/DropDown";
import { searchCategories } from "../../../api/categoryApi";
import { createWardrobeItem } from "@/src/api/wardrobeItemApi";
import { useRouter } from "next/navigation";
export const CreateItemForm = () => {
  const [titleState, setTitleState] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<DropDownOption[]>([]);
  const [deleteImgs, setDeleteImgs] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<number>();
  const router = useRouter();

  const { imgUrls, isAvatarUploading, deleteUploadedImg, handleAvatarChange } =
    useImgsUpload({ isSingle: false });

  const handleChange = async (query: string) => {
    if (!query) {
      setOptions([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const results = await searchCategories(query);
    if (!(results instanceof Error) && results) {
      setOptions(
        results.map((category) => ({
          value: category.id.toString(),
          label: category.name,
        })),
      );
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(titleState, imgUrls);
    const res = await createWardrobeItem(titleState, selectedCategory, imgUrls);
    if (res instanceof Error) {
      // console.error(res.message);
      return;
    }
    setDeleteImgs(false);
    router.push("../");
  };

  const imgUrlsRef = useRef(imgUrls);
  const deleteImgsRef = useRef(deleteImgs);

  useEffect(() => {
    imgUrlsRef.current = imgUrls;
    deleteImgsRef.current = deleteImgs;
  });

  useEffect(() => {
    return () => {
      if (deleteImgsRef.current) {
        imgUrlsRef.current.forEach((url) => deleteUploadedImg(url));
      }
    };
  }, [deleteUploadedImg]);

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
      <Autocomplete
        label="категория"
        className="w-full"
        isLoading={isLoading}
        options={options}
        onChange={handleChange}
        onSelect={(option) => setSelectedCategory(Number(option.value))}
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
