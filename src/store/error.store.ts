import { create } from "zustand";

export type ErrorType = {
  text: string;
  show?: boolean;
};

type ErrorStoreType = {
  error: ErrorType | null;
  setError: (user: ErrorType) => void;
  deleteError: () => void;
};

export const errorStore = create<ErrorStoreType>((set) => ({
  error: null,
  setError: (error) =>
    set({
      error: {
        ...error,
        show: true,
      },
    }),
  deleteError: () => set({ error: null }),
}));
