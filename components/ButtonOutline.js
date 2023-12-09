"use client";
import { useState, useEffect } from "react";
const ButtonOutline = ({ text = "Connect", maxHeight = 55 }) => {
  const [wallet, setWallet] = useState("");
  const [account, setAccount] = useState("");

  useEffect(() => {
    const storedAccount = localStorage.getItem("account");
    if (storedAccount) {
      setAccount(storedAccount);
    }
  }, []);

  async function Connect() {
    console.log("connecting...");
    if (window.ethereum) {
      console.log("ethereum");
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts);
      setWallet(accounts[0]);
      localStorage.setItem("account", accounts[0]);
    } else {
      alert("Please install MetaMask");
      console.log("not ethereum");
    }
  }
  return (
    <button
      className="btnOutline relative"
      style={{
        maxWidth: 145,
        maxHeight,
      }}
      onClick={Connect}
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
        {!wallet ? text : "Disconnect"}
      </span>
    </button>
  );
};

export default ButtonOutline;
