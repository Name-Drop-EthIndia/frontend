"use client";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const ButtonOutline = ({ text = "Get Started", maxHeight = 55 }) => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  return (
    <div className="frc gap-y-3">
      {address && (
        <button>
          <span style={{ color: "var(--text)" }}>
            Connected to
            {address.substring(0, 4) +
              ".." +
              address.substring(address.length - 4)}
          </span>
        </button>
      )}

      <button
        className="btnOutline relative"
        style={{
          maxWidth: 145,
          minWidth: 140,
          maxHeight,
        }}
        onClick={() => {
          if (isConnected) {
            disconnect();
          }
          connect();
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
          className="relative z-10 text-white uppercase p-y-3"
          style={{
            fontSize: 14,
          }}
        >
          {!isConnected ? <>Connect</> : <>disconnect</>}
        </span>
      </button>
    </div>
  );
};

export default ButtonOutline;
