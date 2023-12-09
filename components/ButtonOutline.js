"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
const ButtonOutline = ({ text = "Get Started", maxHeight = 55 }) => {
  // const { isConnected } = useAccount();
  // if (!isConnected) {
  //   return (
  //     <div className="relative h-10 w-10">
  //       <ConnectButton />;
  //     </div>
  //   );
  // }
  return (
    <button
      className="btnOutline relative"
      style={{
        maxWidth: 145,
        maxHeight,
      }}
    >
      <div
        style={{
          backgroundColor: "var(--bg2)",
          position: "absolute",
          top: 1,
          left: 1,
          height: "96%",
          width: "98%",
          borderRadius: 4,
        }}
      />
      <span
        className="relative z-10 text-white uppercase"
        style={{
          fontSize: 14,
        }}
      >
        {" "}
        {text}
      </span>
    </button>
  );
};

export default ButtonOutline;
