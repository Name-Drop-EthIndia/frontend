"use client";
import { useRouter } from "next/navigation";

const HomeButton = ({ text, onClick, loading }) => {
  console.log(text, "text");
  const router = useRouter();
  return (
    <>
      <button
        disabled={loading ? true : false}
        onClick={() => {
          if (onClick) {
            onClick();
            return;
          }
          router.push("/onboarding");
        }}
        className="btnOutline mt-10"
        style={{
          height: 55,
        }}
      >
        {loading ? "loading" : text || "Get Started"}
      </button>
    </>
  );
};

export default HomeButton;
