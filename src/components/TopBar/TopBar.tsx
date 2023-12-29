import React from "react";
import { auth } from "@/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import { useRouter } from "next/router";
import Logout from "../Buttons/Logout";
import Link from "next/link";

type TopBarProps = {};

const TopBar: React.FC<TopBarProps> = () => {
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);
  const router = useRouter();

  return (
    <nav className="relative flex h-[50px] w-full shrink-0 items-center px-5">
      <div className={`flex w-full items-center justify-between`}>
        {" "}
        <Link href="/" className="h-[22px] flex-1">
          Habit Racker
        </Link>
        {/* <div className="flex items-center gap-4 flex-1 justify-center">
          <div className="flex items-center justify-center rounded">
            <FaChevronLeft />
          </div>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-mediummax-w-[170px] text-dark-gray-8 cursor-pointer"
          >
            <div>
              <BsList />
            </div>
            <p>Habits List</p>
          </Link>
          <div className="flex items-center justify-center rounded">
            <FaChevronRight />
          </div>
        </div> */}
        <div className="flex items-center space-x-4 flex-1 justify-end">
          <div>
            <a
              href="https://www.buymeacoffee.com/astonmartinez"
              target="_blank"
              rel="noreferrer"
              className="bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded"
            >
              Premium
            </a>
          </div>
          {!user && (
            <Link
              href="/landing"
              onClick={() =>
                setAuthModalState((prev) => ({
                  ...prev,
                  isOpen: true,
                  type: "login",
                }))
              }
            >
              <button className="py-1 px-2 cursor-pointer rounded">
                Sign In
              </button>
            </Link>
          )}
          {user && (
            <div className="cursor-pointer group relative">
              <Image
                src="/avatar.png"
                alt="Avatar"
                width={30}
                height={30}
                className="rounded-full"
              />
              <div className="absolute top-10 left-2/4 -translate-x-2/4 mx-auto bg-dark-layer-1 text-brand-orange p-2 rounded shadow-lg z-40 group-hover:scale-100 scale-0 transition-all duration-300 ease-in-out">
                <p className="text-sm">{user.email}</p>
              </div>
            </div>
          )}
          {user && <Logout />}
        </div>
      </div>
    </nav>
  );
};
export default TopBar;
