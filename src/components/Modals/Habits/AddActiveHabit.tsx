import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/firebase";
import { toast } from "react-toastify";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useSetRecoilState } from "recoil";
import { habitModalState } from "@/atoms/habitModalAtom";

type AddActiveHabitProps = {};

const AddActiveHabit: React.FC<AddActiveHabitProps> = () => {
  const [selectedHabit, setSelectedHabit] = useState("Reading");
  const [user] = useAuthState(auth);
  const closeModal = useCloseModal();
  const handleConfirm = async () => {
    if (!user) {
      toast.error("Please log in to add a habit", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }
    const userRef = doc(firestore, "users", user.uid);
    try {
      try {
        await updateDoc(userRef, {
          activeHabits: arrayUnion(selectedHabit),
        });
      } catch (error: any) {
        toast.error("Unable to add to your active habits");
      }
      toast.success("Habit added", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      closeModal();
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-left",
        theme: "dark",
      });
    }
  };
  return (
    <>
      <div>
        <h3>Add Habit</h3>
        <p>Please select a habit to add.</p>
        <div>
          <select
            value={selectedHabit}
            onChange={(e) => setSelectedHabit(e.target.value)}
          >
            <option value="Reading">Reading</option>
            <option value="Productivity">Productivity</option>
            <option value="Exercise">Exercise</option>
            <option value="Home Organization">Home Organization</option>
            <option value="Gratitude">Gratitude</option>
            <option value="Meditation">Meditation</option>
            <option value="Self Care">Self Care</option>
          </select>
        </div>
      </div>
      <button onClick={handleConfirm}>Confirm</button>
    </>
  );
};
export default AddActiveHabit;

function useCloseModal() {
  const setAuthModal = useSetRecoilState(habitModalState);

  const closeModal = () => {
    setAuthModal((prev) => ({ ...prev, isOpen: false, type: "add" }));
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);
  return closeModal;
}
