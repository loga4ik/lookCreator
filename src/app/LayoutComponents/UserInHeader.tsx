"use client";

import { userStore } from "@/src/store/user.store";
import { useRouter } from "next/navigation";

export const UserInHeader = () => {
  const userAuthStore = userStore((state) => state.user);
  const router = useRouter();

  return (
    <>
      {userAuthStore ? (
        <div>{userAuthStore.login}</div>
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
    </>
  );
};
