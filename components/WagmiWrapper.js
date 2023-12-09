"use client"
import { WagmiConfig, createConfig, mainnet } from 'wagmi'
import { createPublicClient, http } from 'viem'
const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http()
  }),
})

const WagmiWrapper = ({children})=>{
    return <>
    <WagmiConfig config={config}>
        {children}
    </WagmiConfig>
        
    </>
}
export default WagmiWrapper