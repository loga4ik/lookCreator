"use client";

import { isExistUser, RegUser } from "@/src/api/userApi";
import { userStore } from "@/src/store/user.store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../UIKit/components/Button/Button";
import { TextInput } from "../UIKit/components/TextInput/TextInput";
import { FileInput } from "../UIKit/components/FileInput/FileInput";
import { useImgsUpload } from "./useImgsUpload";

type RegFormData = {
  login: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

const formatPhoneNumber = (value: string) => {
  let digits = value.replace(/\D/g, "").replace(/^8/, "7");
  if (!digits.startsWith("7")) digits = `7${digits}`;
  digits = digits.slice(0, 11);

  const rest = digits.slice(1);
  let result = "+7";
  if (rest.length > 0) result += ` (${rest.slice(0, 3)}`;
  if (rest.length >= 3) result += ")";
  if (rest.length > 3) result += ` ${rest.slice(3, 6)}`;
  if (rest.length > 6) result += `-${rest.slice(6, 8)}`;
  if (rest.length > 8) result += `-${rest.slice(8, 10)}`;
  return result;
};

export const RegForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegFormData>({ mode: "onBlur", reValidateMode: "onBlur" });

  const phoneField = register("phone", {
    required: "Введите телефон",
    validate: (value) =>
      value.replace(/\D/g, "").length === 11 || "Некорректный номер",
  });

  const router = useRouter();
  const userAuthStore = userStore((state) => state);
  const { imgUrl, isAvatarUploading, handleAvatarChange } = useImgsUpload();

  const createUser = async (formData: RegFormData) => {
    const user = await RegUser({ ...formData, imgLink: imgUrl });

    if (user instanceof Error) {
      console.error(user.message);
      return;
    }
    userAuthStore.logIn(user);
    console.log(user);
    router.push("/");
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <form
      onSubmit={handleSubmit((data) => createUser(data))}
      className="flex flex-col min-h-full items-center justify-center center m-1.5 gap-y-10 flex-1"
    >
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          placeholder="логин"
          className="input"
          error={errors.login?.message}
          {...register("login", {
            required: "Введите логин",
            minLength: {
              value: 3,
              message: "Минимум 3 символа",
            },
            validate: async (value) => {
              const result = await isExistUser(value, null);
              if (result instanceof Error) return true;
              return !result || "Пользователь с таким логином уже существует";
            },
          })}
        />
        <TextInput
          placeholder="имя"
          className="input"
          error={errors.name?.message}
          {...register("name", {
            required: "Введите имя",
          })}
        />
        <TextInput
          placeholder="фамилия"
          className="input"
          error={errors.surname?.message}
          {...register("surname", {
            required: "Введите фамилию",
          })}
        />
        <TextInput
          placeholder="email"
          className="input"
          error={errors.email?.message}
          // aria-invalid={errors.email ? "true" : "false"}
          {...register("email", {
            required: "Введите email",
            validate: async (value) => {
              const result = await isExistUser(null, value);
              if (result instanceof Error) return true;
              return !result || "Пользователь с таким email уже существует";
            },
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Введите корректный email",
            },
          })}
        />
        <TextInput
          type="tel"
          inputMode="tel"
          placeholder="+7 (777) 777-77-77"
          error={errors.phone?.message}
          {...phoneField}
          onChange={(e) => {
            e.target.value = formatPhoneNumber(e.target.value);
            phoneField.onChange(e);
          }}
        />
        <TextInput
          type="password"
          placeholder="пароль"
          className="input"
          error={errors.password?.message}
          {...register("password", {
            required: "Введите пароль",
            minLength: {
              value: 3,
              message: "Минимум 3 символа",
            },
          })}
        />
        <TextInput
          type="password"
          placeholder="повторите пароль"
          className="input"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword", {
            required: "Повторите пароль",
            validate: (value) =>
              value === watch("password") || "Пароли не совпадают",
          })}
        />
        <FileInput
          label="Аватар"
          hint={isAvatarUploading ? "Загрузка..." : undefined}
          accept="image/*"
          onFilesChange={handleAvatarChange}
        />
      </div>
      <Button type="submit" className="btn btn-outline">
        отправить
      </Button>
      <Link className="absolute bottom-5 right-5" href={"/logIn"}>
        <Button variant="ghost">войти</Button>
      </Link>
    </form>
  );
};
