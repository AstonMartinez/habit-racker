import { atom } from "recoil";

type HabitModalState = {
  isOpen: boolean;
  type: "add" | "update" | "delete";
};

const initialHabitModalState: HabitModalState = {
  isOpen: false,
  type: "add",
};

export const habitModalState = atom<HabitModalState>({
  key: `habitModalState`,
  default: initialHabitModalState,
});
