import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, firestore } from "@/firebase/firebase";
import { Habit } from "@/utils/types/habit";
import { useSetRecoilState } from "recoil";
import { habitModalState } from "@/atoms/habitModalAtom";
import { useAuthState } from "react-firebase-hooks/auth";
import HabitListSkeleton from "../Skeletons/HabitListSkeleton";

type HabitListProps = {
  setLoadingHabits: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedHabit: React.Dispatch<React.SetStateAction<string>>;
};

const wrapStyle = {
  display: "flex",
  justifyContent: "center",
  border: "1px solid green",
  width: "20vw",
  height: "100vh",
};

const buttonStyle = {
  border: "1px solid black",
  backgroundColor: "black",
  fontStyle: `'Nunito', sans-serif`,
  color: "white",
  borderRadius: "20px",
  height: "40px",
  width: "100px",
};

const HabitList: React.FC<HabitListProps> = ({ setSelectedHabit }) => {
  const setHabitModalState = useSetRecoilState(habitModalState);
  const habits = useGetHabitOptions();
  const [addingHabit, setAddingHabit] = useState(false);
  const [user] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const activeHabits = useGetUserHabits(setIsLoading);

  const handleClick = (type: "add" | "update" | "delete") => {
    setHabitModalState((prev) => ({ ...prev, isOpen: true, type }));
  };

  return (
    <div style={wrapStyle}>
      <div>
        <h1>My Habits</h1>
        <button onClick={() => handleClick("add")} style={buttonStyle}>
          Add Habit
        </button>
        {isLoading && (
          <div className="max-w-[1200px] mx-auto sm:w-7/12 w-full animate-pulse">
            {[...Array(5)].map((_, idx) => (
              <HabitListSkeleton key={idx} />
            ))}
          </div>
        )}
        {!isLoading && (
          <div>
            {activeHabits.map((hab, idx) => (
              <p key={idx} onClick={() => setSelectedHabit(hab)}>
                {hab}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default HabitList;

function useGetHabitOptions() {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    const getHabits = async () => {
      const q = query(collection(firestore, "habits"), orderBy("order", "asc"));
      const querySnapshot = await getDocs(q);
      const tmp: Habit[] = [];
      querySnapshot.forEach((doc) => {
        tmp.push({ id: doc.id, ...doc.data() } as Habit);
      });
      setHabits(tmp);
    };
    getHabits();
  }, []);
  return habits;
}

function useGetUserHabits(
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
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

    if (user) {
      getActiveHabits();
      setIsLoading(false);
    }
    if (!user) setUserHabits([]);
  }, []);
  return userHabits;
}
