import { aptosClient } from "../../module";
import {
  useWallet,
  InputTransactionData,
} from "@aptos-labs/wallet-adapter-react";
import { useState } from "react";

const envmintfucn = process.env.NEXT_PUBLIC_MINTFUNCTION;

const transaction = {
  data: {
    function: `${envmintfucn}`, // Assuming envmintfucn is the function name in the old format
    typeArguments: [], // No type arguments in the old format
    functionArguments: [], // No function arguments in the old format
  },
};

export const useMintOnChainA = () => {
  const { account, connected, network, signMessage, signAndSubmitTransaction } =
    useWallet();
  const [minting, setMinting] = useState(false);
  const [error, setError] = useState(null);
  const [transactionHash, setTransactionHash] = useState(null);

  const mint = async () => {
    setMinting(true);
    setError(null);

    try {
      const pendingTransaction = await signAndSubmitTransaction(transaction);
      await aptosClient(network?.name.toLowerCase()).waitForTransaction({
        transactionHash: pendingTransaction.hash,
      });
      setTransactionHash(pendingTransaction.hash);
    } catch (error) {
      setError(`Error minting on ChainA: ${error.message}`);
    } finally {
      setMinting(false);
    }
  };

  return {
    mint,
    minting,
    error,
    transactionHash,
  };
};
