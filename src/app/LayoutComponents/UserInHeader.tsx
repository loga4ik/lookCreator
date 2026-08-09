"use client";

import { userStore } from "@/src/store/user.store";
import { useRouter } from "next/navigation";
import { Button } from "../UIKit/components/Button/Button";
import { useCallback, useEffect } from "react";
import { authByToken } from "@/src/api/userApi";

export const UserInHeader = () => {
  const user = userStore((state) => state.user);
  const logIn = userStore((state) => state.logIn);
  const router = useRouter();

  const logInByToken = useCallback(async () => {
    const user = await authByToken();
    if (!(user instanceof Error)) {
      logIn(user);
    }
  }, [logIn]);

  useEffect(() => {
    if (!user) {
      logInByToken();
    }
  }, [logInByToken, user]);
  return (
    <Button variant="ghost">
      {user ? (
        <div>{user.login}</div>
      ) : (
        <div
          className="cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            router.push("/logIn");
          }}
        >
          войти
        </div>
      )}
    </Button>
  );
};
