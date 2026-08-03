"use client";

import { logInUser } from "@/src/api/userApi";
import { errorStore } from "@/src/store/error.store";
import { userStore } from "@/src/store/user.store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitEvent, useEffect, useState } from "react";
import { Button } from "../UIKit/components/Button/Button";
import { TextInput } from "../UIKit/components/TextInput/TextInput";

export default function LogIn() {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });
  const router = useRouter();
  const userAuthStore = userStore((state) => state);
  const errorHandler = errorStore((state) => state);

  const getLogIn = async (
    e: SubmitEvent,
    formData: {
      login: string;
      password: string;
    },
  ): Promise<Response | undefined | void> => {
    e.preventDefault();
    const user = await logInUser(formData.login, formData.password);
    console.log(user);

    if (user instanceof Error) {
      console.log(user);

      errorHandler.setError({ text: user.message });
      console.log(user.message);
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
      <TextInput
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
      <TextInput
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
        <Button type="submit">
          отправить
        </Button>
        <Link
          className="absolute bottom-0 right-0"
          href={"/registration"}
        >
          <Button variant="ghost">регистрация</Button>
        </Link>
    </form>
  );
}
