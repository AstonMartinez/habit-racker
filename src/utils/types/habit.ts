export type Field = {
  id: number;
  fieldLabel: string;
  fieldType: string;
  helperText: string;
};

export type Task = {
  id: number;
  taskName: string;
  taskDescription: string;
};

export type Record = {
  id: string;
  habit: Habit;
  responses: object;
};

export type Habit = {
  id: string;
  order: number;
  category: string;
  title: string;
  description: string;
  fields: Field[];
  records: [];
};
