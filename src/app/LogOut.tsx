"use client";
import { userStore } from "../store/user.store";
//потом переместить

export const LogOut = () => {
  const userDataStore = userStore((state) => state);

  return (
    <>
      {userDataStore.user && (
        <button
          className="btn btn-outline"
          onClick={(e) => {
            e.preventDefault();
            userDataStore.logOut();
          }}
        >
          Выйти
        </button>
      )}
    </>
  );
};
