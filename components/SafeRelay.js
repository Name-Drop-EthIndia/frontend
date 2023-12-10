import { GelatoRelayPack } from "@safe-global/relay-kit";

const relayPack = new GelatoRelayPack({ safeSdk, apiKey }); // apiKey is optional

relayPack.relayTransaction({
  target: "0x...", // the Safe address
  encodedTransaction: "0x...", // Encoded Safe transaction data
  chainId: 5,
});
