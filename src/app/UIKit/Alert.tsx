"use client";

import { useEffect } from "react";
import { errorStore } from "@/src/store/error.store";

export const Alert = () => {
  const { error, deleteError } = errorStore();

  useEffect(() => {
    if (!error) return;

    const timeout = setTimeout(() => {
      deleteError();
    }, 5000);

    return () => clearTimeout(timeout);
  }, [error, deleteError]);

  if (!error) return null;

  return (
    <div className="pointer-events-none fixed top-22 right-6 z-9999">
      <div
        role="alert"
        className="
          alert alert-soft alert-error
          pointer-events-auto
          w-96
          shadow-xl
          animate-in
          fade-in-0
          slide-in-from-top-4
          duration-300
          flex"
      >
        <span className="flex-1">{error.text}</span>

        <button
          type="button"
          className="btn btn-circle btn-xs"
          onClick={deleteError}
        >
          ✕
        </button>
      </div>
    </div>
  );
};
