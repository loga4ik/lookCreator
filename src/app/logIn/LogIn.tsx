"use client";

import { logInUser } from "@/src/api/userApi";
import { userStore } from "@/src/store/user.store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitEvent, useEffect, useState } from "react";

export default function LogIn() {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });
  const router = useRouter();
  const userAuthStore = userStore((state) => state);

  
  const getLogIn = async (
    e: SubmitEvent,
    formData: {
      login: string;
      password: string;
    },
  ): Promise<Response | undefined | void> => {
    e.preventDefault();
    const user = await logInUser(formData.login, formData.password);

    if (user instanceof Error) {
      console.error(user.message);
      return;
    }
    userAuthStore.logIn(user);
    console.log(user);
    router.push("/");
  };

  useEffect(() => {
    if (userAuthStore.user) {
      router.push("/");
    }
  }, [userAuthStore.user, router]);

  return (
    <form
      onSubmit={(e: SubmitEvent) => getLogIn(e, formData)}
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
          href={"/registration"}
        >
          регистрация
        </Link>
      </div>
    </form>
  );
}
