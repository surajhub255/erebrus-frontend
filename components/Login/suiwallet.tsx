import { useWallet  } from "@suiet/wallet-kit";
import Cookies from "js-cookie";
import axios from "axios";

export const useSuiWallet = () => {
  const wallet = useWallet();
  const {
    status,
    connected,
    account,

  } = useWallet();

  const isSendableNetwork = (connected, network) => {
    return connected && network?.toLowerCase() === process.env.NEXT_PUBLIC_SUI_NETWORK.toLowerCase();
  };

  const sendableSui = isSendableNetwork(status === "connected", wallet.chain.id);

  const onSignMessageSui = async (chainsym, setshowsignbutton) => {
    if (sendableSui) {
      try {
        const REACT_APP_GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL;
        const { data } = await axios.get(
          `${REACT_APP_GATEWAY_URL}api/v1.0/flowid?walletAddress=${wallet.address}&chain=sui`
        );
        const msg = data.payload.eula + data.payload.flowId;
        const nonce = data.payload.flowId;
        const msgBytes = new TextEncoder().encode(msg);

        const result = await wallet.signPersonalMessage({
          message: msgBytes,
        });

        const authenticationData = {
          flowId: nonce,
          signatureSui: result.signature,
        };

        const authenticateApiUrl = `${REACT_APP_GATEWAY_URL}api/v1.0/authenticate?chain=sui`;

        const config = {
          url: authenticateApiUrl,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: authenticationData,
        };

        const authResponse = await axios(config);
        const token = authResponse?.data?.payload?.token;
        const userId = authResponse?.data?.payload?.userId;

        Cookies.set("erebrus_token", token, { expires: 7 });
        Cookies.set("erebrus_wallet", account?.address ?? "", { expires: 7 });
        Cookies.set("erebrus_userid", userId, { expires: 7 });

        window.location.reload();
      } catch (error) {
        console.error(error);
        setshowsignbutton(true);
      }
    } else {
      alert(`Switch to ${process.env.NEXT_PUBLIC_SUI_NETWORK} in your wallet`);
    }
  };

  return {connected, account, onSignMessageSui };
};
