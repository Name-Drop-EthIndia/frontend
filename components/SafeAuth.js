import { Web3AuthModalPack } from "@safe-global/auth-kit";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";

const safe = async () => {
  const options = {
    clientId: process.env.REACT_APP_WEB3AUTH_CLIENT_ID,
    web3AuthNetwork: "testnet",
    chainConfig: {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: chainId,
      rpcTarget: rpcTarget,
    },
    uiConfig: {
      theme: "dark",
      loginMethodsOrder: ["google", "facebook"],
    },
  };

  const modalConfig = {
    [WALLET_ADAPTERS.TORUS_EVM]: {
      label: "torus",
      showOnModal: false,
    },
    [WALLET_ADAPTERS.METAMASK]: {
      label: "metamask",
      showOnDesktop: true,
      showOnMobile: false,
    },
  };

  const openloginAdapter = new OpenloginAdapter({
    loginSettings: {
      mfaLevel: "mandatory",
    },
    adapterSettings: {
      uxMode: "popup",
      whiteLabel: {
        name: "Safe",
      },
    },
  });

  const web3AuthModalPack = new Web3AuthModalPack({
    txServiceUrl: "https://safe-transaction-{chain}.safe.global",
  });

  await web3AuthModalPack.init({
    options,
    adapters: [openloginAdapter],
    modalConfig,
  });

  // Allow to login and get the derived EOA
  await web3AuthModalPack.signIn();

  // Logout
  await web3AuthModalPack.signOut();

  // Get the provider
  web3AuthModalPack.getProvider();
};

export default safe;
