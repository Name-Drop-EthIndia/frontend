"use client";
import { WagmiConfig, createConfig, mainnet, configureChains } from "wagmi";
import { scrollSepolia } from "wagmi/chains";
import { createPublicClient, http } from "viem";
const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: scrollSepolia,
    transport: http(),
  }),
});

const WagmiWrapper = ({ children }) => {
  return (
    <>
      <WagmiConfig config={config}>{children}</WagmiConfig>
    </>
  );
};
export default WagmiWrapper;
