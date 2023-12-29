import { auth, firestore } from "@/firebase/firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { habits } from "@/utils/habits";
import { Field, Record } from "@/utils/types/habit";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import { recordModalState } from "@/atoms/recordModalAtom";
import { useRecoilValue } from "recoil";
import RecordsModal from "../Modals/Records/RecordsModal";

type HabitDisplayProps = {
  selectedHabit: string;
};

const outerStyle = {
  border: "1px solid red",
  width: "80vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  flexFlow: "column nowrap",
};

const HabitDisplay: React.FC<HabitDisplayProps> = ({ selectedHabit }) => {
  const [haveId, setHaveId] = useState(selectedHabit ? true : false);
  const [user] = useAuthState(auth);
  const ref = useGetHabitRecords(selectedHabit ? selectedHabit : "none");
  const setRecordsModalState = useSetRecoilState(recordModalState);
  const recordModal = useRecoilValue(recordModalState);

  const handleAddClick = () => {
    setRecordsModalState((prev) => ({
      ...prev,
      isOpen: true,
      type: "add",
      habit: selectedHabit,
    }));
  };

  return (
    <>
      <div style={outerStyle}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1>
            {selectedHabit ? selectedHabit : "Choose a habit to get started"}
          </h1>
          {selectedHabit ? (
            <button onClick={handleAddClick}>Log Habit Activity</button>
          ) : (
            ""
          )}
        </div>
        <div>
          <table className="text-sm text-left text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto">
            <thead
              style={{ padding: "5px" }}
              className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b"
            >
              <tr>
                {selectedHabit &&
                  habits[selectedHabit].fields.map((field: Field, idx) => (
                    <th
                      scope="col"
                      className="px-8 py-4 w-0 font-medium"
                      key={idx}
                    >
                      {field.fieldLabel}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {ref?.map((docu, idx) => (
                <tr
                  className={`${idx % 2 == 1 ? "bg-dark-layer-1" : ""}`}
                  key={idx}
                >
                  {selectedHabit === "Reading" ? (
                    <>
                      <td>{docu.responses["Book Title"]}</td>
                      <td>{docu.responses["Author"]}</td>
                      <td>{docu.responses["Date Started"].seconds}</td>
                      <td>{docu.responses["Date Finished"].seconds}</td>
                      <td>{docu.responses["Genre"]}</td>
                      <td>{docu.responses["Current Chapter"]}</td>
                    </>
                  ) : (
                    ""
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {recordModal.isOpen && <RecordsModal selectedHabit={selectedHabit} />}
      </div>
    </>
  );
};
export default HabitDisplay;

function useGetCurrentHabit(id: string) {
  const [habit, setHabit] = useState<any>(null);
  console.log(id);

  useEffect(() => {
    const getCurrentHabit = async () => {
      const docRef = doc(firestore, "habits", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setHabit(docSnap);
      } else {
        console.log("No such document");
      }
    };

    if (id === "none") return;
    if (id !== "none") getCurrentHabit();
  }, [id]);
  return habit;
}

function useGetHabitRecords(id: string) {
  const [records, setRecords] = useState<any[]>([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const getHabitRecords = async () => {
      const habitRef = doc(firestore, "habits", id);
      console.log(habitRef);
      const docSnap = await getDoc(habitRef);
      const q = query(
        collection(firestore, "records"),
        where("user", "==", user!.uid),
        where("habit", "==", id)
      );
      const querySnapshot = await getDocs(q);
      console.log("QUERY SNAPSHOT: ", querySnapshot);
      const res: any[] = [];
      querySnapshot.forEach((docu) => {
        res.push({ ...docu.data() });
      });
      setRecords(res);
    };

    getHabitRecords();
  }, [id]);
  return records;

  //   useEffect(() => {
  //     const getHabitRecords = async () => {
  //       if (!user) return records;
  //       const userRef = doc(firestore, "users", user!.uid);
  //       const userDoc = await getDoc(userRef);
  //       const habitRecords = userDoc.data()?.habitRecords;
  //       //   console.log(userDoc.data()?.habitRecords[0]);
  //       const res = await Promise.all(
  //         habitRecords.map(async (record: any) => {
  //           const docRef = doc(firestore, "records", record.id);
  //           const docSnap = await getDoc(docRef);
  //           return { id: docSnap.id, ...docSnap.data() };
  //         })
  //       );
  //       console.log("RECORDS: ", res);
  //     };

  // getHabitRecords();
  //   });
}
