import { create } from "zustand";

type User = {
  _id: string;
  nickname: string;
  profileImage: string | null;
  createdAt: Date;
};

type UserStore = {
  user: User | null;
  setUser: (userData: User) => void;
};

const useUser = create<UserStore>((set) => ({
  user: null,
  setUser: (userData: User) => set({ user: userData })
}));

export default useUser;
