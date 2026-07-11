"use client";

import { RegUser } from "@/src/api/userApi";
import { userStore } from "@/src/store/user.store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitEvent, useState } from "react";

export const RegForm = () => {
  const [formData, setFormData] = useState({
    login: "",
    name: "",
    surname: "",
    patronymic: "",
    email: "",
    phone: "",
    password: "",
  });

  const router = useRouter();
  const userAuthStore = userStore((state) => state);
  const createUser = async (
    e: SubmitEvent,
    formData: {
      login: string;
      name: string;
      surname: string;
      patronymic: string;
      email: string;
      phone: string;
      password: string;
    },
  ) => {
    e.preventDefault();
    const user = await RegUser(
      formData.login,
      formData.name,
      formData.surname,
      formData.patronymic,
      formData.email,
      formData.phone,
      formData.password,
    );

    if (user instanceof Error) {
      console.error(user.message);
      return;
    }
    userAuthStore.logIn(user);
    console.log(user);
    router.push("/");
  };

  return (
    <form
      onSubmit={(e: SubmitEvent) => createUser(e, formData)}
      className="flex flex-col min-h-full items-center justify-center center m-1.5 gap-y-10 flex-1"
    >
      <input
        type="text"
        name="login"
        placeholder="логин"
        className="input max-w-sm"
        value={formData.login}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            login: e.target.value,
          }))
        }
      />
      <input
        type="text"
        name="surname"
        placeholder="фамилия"
        className="input max-w-sm"
        value={formData.surname}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            surname: e.target.value,
          }))
        }
      />
      <input
        type="text"
        name="patronymic"
        placeholder="отчество"
        className="input max-w-sm"
        value={formData.patronymic}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            patronymic: e.target.value,
          }))
        }
      />
      <input
        type="text"
        name="email"
        placeholder="email"
        className="input max-w-sm"
        value={formData.email}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            email: e.target.value,
          }))
        }
      />
      <input
        type="text"
        name="phone"
        placeholder="телефон"
        className="input max-w-sm"
        value={formData.phone}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            phone: e.target.value,
          }))
        }
      />
      <input
        type="text"
        name="password"
        placeholder="пароль"
        className="input max-w-sm"
        value={formData.password}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            password: e.target.value,
          }))
        }
      />
      <div className="flex w-fit">
        <button type="submit" className="btn btn-outline grow-7">
          отправить
        </button>
        <Link
          className="btn btn-outline outline-gray-400font-light text-xs size-min h-7 grow-3"
          href={"/logIn"}
        >
          войти
        </Link>
      </div>
    </form>
  );
};
