import { create } from "zustand";

export type UserType = {
  login: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
  prophileImageLink: string;
};

type UserStore = {
  user: UserType | null;
  logIn: (user: UserType) => void;
  logOut: () => void;
};

export const userStore = create<UserStore>((set) => ({
  user: null,
  logIn: (user) => set({ user }),
  logOut: () => set({ user: null }),
}));
