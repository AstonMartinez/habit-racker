import { habits } from "@/utils/habits";
import { Field } from "@/utils/types/habit";
import React, { useEffect, useState } from "react";
import FieldInput from "./FieldInput";

type AddRecordProps = {
  selectedHabit: string;
};

const AddRecord: React.FC<AddRecordProps> = ({ selectedHabit }) => {
  const [responses, setResponses] = useState({});
  const initialStrings = [...habits[selectedHabit].fields];

  useEffect(() => {
    let res: any = [];
    for (let i = 0; i < initialStrings.length; i++) {
      res.push(initialStrings[i].fieldLabel);
    }

    let newObj = {};

    for (let i = 0; i < res.length; i++) {
      Object.defineProperty(newObj, res[i], {
        value: "",
        writable: false,
      });
    }
    setResponses(newObj);
    console.log(newObj);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const items = document.querySelectorAll(".field-inputs");

    for (let i = 0; i < items.length; i++) {
      let curr = items[i];
      console.log(curr.id);
      setResponses((prev) => ({ ...prev, [curr.id]: curr.innerHTML }));
    }
    console.log(responses);
    // console.log(res);
  };
  console.log(selectedHabit);
  //   console.log(habits[selectedHabit]);
  return (
    <div>
      <h3>Add Record</h3>
      <form onSubmit={handleSubmit}>
        {habits[selectedHabit].fields.map((field, idx) => (
          <FieldInput field={field} key={idx} />
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default AddRecord;
