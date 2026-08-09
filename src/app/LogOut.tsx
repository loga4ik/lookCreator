"use client";
import { useRouter } from "next/navigation";
import { logOutUser } from "../api/userApi";
import { userStore } from "../store/user.store";
import { Button } from "./UIKit/components/Button/Button";
//потом переместить

export const LogOut = () => {
  const userDataStore = userStore((state) => state);
  const router = useRouter();

  const logOut = async () => {
    await logOutUser();
    userDataStore.logOut();
      router.push("/");
  };

  return (
    <>
      {userDataStore.user && (
        <Button
          size="sm"
          variant="ghost"
          className="text-secondary rounded-4xl"
          onClick={logOut}
        >
          Выйти
        </Button>
      )}
    </>
  );
};
