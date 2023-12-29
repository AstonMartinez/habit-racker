import { atom } from "recoil";

type RecordModalState = {
  isOpen: boolean;
  type: "add" | "update" | "delete";
  habit: string;
};

const initialRecordModalState: RecordModalState = {
  isOpen: false,
  type: "add",
  habit: "Reading",
};

export const recordModalState = atom<RecordModalState>({
  key: `recordModalState`,
  default: initialRecordModalState,
});
