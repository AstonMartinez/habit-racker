import { auth, firestore } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import HabitDisplay from "../HabitDisplay/HabitDisplay";
import HabitList from "../HabitList/HabitList";

type DashboardComponentProps = {
  setLoadingHabits: React.Dispatch<React.SetStateAction<boolean>>;
};

const wrapStyle = {
  display: "flex",
  //   justifyContent: "space-between",
  border: "1px solid blue",
  width: "100vw",
  height: "100vh",
};

const DashboardComponent: React.FC<DashboardComponentProps> = ({
  setLoadingHabits,
}) => {
  const [selectedHabit, setSelectedHabit] = useState("");
  return (
    <div style={wrapStyle}>
      <div>
        <HabitList
          setLoadingHabits={setLoadingHabits}
          setSelectedHabit={setSelectedHabit}
        />
      </div>
      <div>
        <HabitDisplay selectedHabit={selectedHabit} />
      </div>
    </div>
  );
};
export default DashboardComponent;

function useGetUserHabits() {
  const [userHabits, setUserHabits] = useState<any[]>([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const getActiveHabits = async () => {
      const userRef = doc(firestore, "users", user!.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        setUserHabits(userDoc.data().activeHabits);
      }
    };

    if (user) getActiveHabits();
    if (!user) setUserHabits([]);
  }, []);
  return userHabits;
}
