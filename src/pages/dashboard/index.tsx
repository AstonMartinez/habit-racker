import React, { useState } from "react";
import TopBar from "@/components/TopBar/TopBar";
import HabitList from "@/components/HabitList/HabitList";
import { habitModalState } from "@/atoms/habitModalAtom";
import { useRecoilValue } from "recoil";
import HabitModal from "@/components/Modals/Habits/HabitModal";
import HabitDisplay from "@/components/HabitDisplay/HabitDisplay";
import DashboardComponent from "@/components/Dashboard/DashboardComponent";

type DashboardProps = {};

const Dashboard: React.FC<DashboardProps> = () => {
  const [loadingHabits, setLoadingHabits] = useState(true);
  const habitModal = useRecoilValue(habitModalState);

  return (
    <div className="h-screen relative">
      <div className="max-w-7xl mx-auto">
        <TopBar />
      </div>
      <div style={{ display: "flex" }}>
        <div>
          <DashboardComponent setLoadingHabits={setLoadingHabits} />
        </div>
      </div>
      {habitModal.isOpen && <HabitModal />}
    </div>
  );
};
export default Dashboard;
