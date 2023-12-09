"use client";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useState, useEffect } from "react";

const ButtonOutline = ({ text = "Get Started", maxHeight = 55 }) => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  // const [wallet, setWallet] = useState("");
  // const [account, setAccount] = useState("");

  // useEffect(() => {
  //   const storedAccount = localStorage.getItem("account");
  //   if (storedAccount) {
  //     setAccount(storedAccount);
  //   }
  // }, []);

  // async function Connect() {
  //   console.log("connecting...");
  //   if (window.ethereum) {
  //     console.log("ethereum");
  //     const accounts = await window.ethereum.request({
  //       method: "eth_requestAccounts",
  //     });
  //     console.log(accounts);
  //     setWallet(accounts[0]);
  //     localStorage.setItem("account", accounts[0]);
  //   } else {
  //     console.log("not ethereum");
  //   }
  // }
  // return (
  //   <button
  //     className="btnOutline relative"
  //     style={{
  //       maxWidth: 145,
  //       maxHeight,
  //     }}
  //     onClick={()=>{
  //       if (isConnected){
  //         disconnect()
  //       }
  //       connect()
  //     }}
  //   >
  //     <div
  //       style={{
  //         backgroundColor: "var(--bg2)",
  //         position: "absolute",
  //         top: 1,
  //         left: 1,
  //         height: "96%",
  //         width: "98%",
  //         borderRadius: 4,
  //       }}
  //     />
  //     "Connected to" {address}
  //     <span
  //       className="relative z-10 text-white uppercase"
  //       style={{
  //         fontSize: 14,
  //       }}
  //     >
  //       {" "}
  //       {text}
  //     </span>
  //   </button>
  // );
  if (isConnected)
    return (
      <div>
        Connected to {address}
        <button
          style={{
            maxWidth: 145,
            maxHeight,
          }}
          onClick={() => disconnect()}
        >
          Disconnect
        </button>
      </div>
    );
  return (
    <button
      className="btnOutline relative"
      style={{
        maxWidth: 145,
        maxHeight,
      }}
      onClick={() => connect()}
    >
      Connect Wallet
    </button>
  );
};

export default ButtonOutline;
