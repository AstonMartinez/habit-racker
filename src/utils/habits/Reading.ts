import { Field, Habit } from "../types/habit";
const FieldOne: Field = {
  id: 1,
  fieldLabel: "Book Title",
  fieldType: "text",
  helperText: "What is the name of the book you are reading?",
};

const FieldTwo: Field = {
  id: 2,
  fieldLabel: "Author",
  fieldType: "text",
  helperText: "Who wrote the book you are reading?",
};

const FieldThree: Field = {
  id: 3,
  fieldLabel: "Date Started",
  fieldType: "date",
  helperText: "What day did you start reading the book?",
};

const FieldFour: Field = {
  id: 4,
  fieldLabel: "Date Finished",
  fieldType: "date",
  helperText: "What day did you finish reading the book?",
};

const FieldFive: Field = {
  id: 5,
  fieldLabel: "Genre",
  fieldType: "text",
  helperText:
    "What kind of book are you reading? (e.g., Thriller, Romance, Non-Fiction, Fiction, Science Fiction)",
};

const FieldSix: Field = {
  id: 6,
  fieldLabel: "Current Chapter",
  fieldType: "text",
  helperText: "What chapter of the book are you currently on?",
};

const Reading: Habit = {
  id: "Reading",
  category: "Intellect",
  title: "Reading",
  order: 1,
  description: "Level Up Your Reading Habit",
  fields: [FieldOne, FieldTwo, FieldThree, FieldFour, FieldFive, FieldSix],
  records: [],
};

export default Reading;
