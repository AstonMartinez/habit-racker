import React from "react";
import Link from "next/link";
import Image from "next/image";
import { authModalState } from "@/atoms/authModalAtom";
import { useSetRecoilState } from "recoil";

type NavBarProps = {};

const NavBar: React.FC<NavBarProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const handleClick = () => {
    setAuthModalState((prev) => ({ ...prev, isOpen: true }));
  };

  const handleClickTwo = () => {
    setAuthModalState((prev) => ({ ...prev, isOpen: true, type: "register" }));
  };

  return (
    <div className="flex items-center justify-between sm:px-12 px-2 md:px-24">
      <Link href="/" className="flex items-center justify-center h-20">
        Habit Racker
      </Link>
      <div className="flex items-center">
        <button
          className="bg-brand-orange text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium
                hover:text-brand-orange hover:bg-white hover:border-2 hover:border-brand-orange border-2 border-transparent
                transition duration-300 ease-in-out
                "
          onClick={handleClick}
        >
          Log In
        </button>
        <button
          className="px-2 py-1 sm:px-4 rounded-md text-sm font-medium"
          onClick={handleClickTwo}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default NavBar;
