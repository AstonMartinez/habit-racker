import { Habit } from "../types/habit";
import Reading from "./Reading";

interface HabitMap {
  [key: string]: Habit;
}

export const habits: HabitMap = {
  Reading: Reading,
};
