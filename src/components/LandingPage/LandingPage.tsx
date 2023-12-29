import React, { useEffect, useState } from "react";
import NavBar from "@/components/NavBar/NavBar";
import AuthModal from "@/components/Modals/AuthModal";
import { authModalState } from "@/atoms/authModalAtom";
import { useRecoilValue } from "recoil";
import { auth } from "@/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import Image from "next/image";

type LandingPageProps = {};

const LandingPage: React.FC<LandingPageProps> = () => {
  const authModal = useRecoilValue(authModalState);
  const [user, loading, error] = useAuthState(auth);
  const [pageLoading, setPageLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/");
    if (!loading && !user) setPageLoading(false);
  }, [user, router, loading]);

  if (pageLoading) return null;
  return (
    <div className="h-screen relative">
      <div className="max-w-7xl mx-auto">
        <NavBar />
        <div className="flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none">
          <h1>Welcome to Habit Racker!</h1>
          <h3>Rack up healthy habit progress.</h3>
        </div>
        {authModal.isOpen && <AuthModal />}
      </div>
    </div>
  );
};
export default LandingPage;
