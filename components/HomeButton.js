"use client";
import { useRouter } from "next/navigation";

const HomeButton = () => {
  const router = useRouter();
  return (
    <>
      <button
        onClick={() => router.push("/onboarding")}
        className="btnOutline mt-10"
        style={{
          height: 55,
        }}
      >
        Get Started
      </button>
    </>
  );
};

export default HomeButton;
