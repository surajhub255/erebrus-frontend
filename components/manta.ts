
interface Chain {
  id: number;
  name: string;
  nativeCurrency: {
    decimals: number;
    name: string;
    symbol: string;
  };
  rpcUrls: {
    public: {
      http: string[];
    };
    default: {
      http: string[];
    };
  };
  blockExplorers: {
    etherscan?: {
      name: string;
      url: string;
    };
    default: {
      name: string;
      url: string;
    };
  };
}

export const MantaPacific: Chain = {
  // ... your existing MantaPacific object
  id: 169,
  name: "Manta Pacific",
  // network: "Manta Pacific Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Manta Pacific",
    symbol: "ETH",
  },
  rpcUrls: {
    public: {
      http: ["https://pacific-rpc.manta.network/http"],
    },
    default: {
      http: ["https://pacific-rpc.manta.network/http"],
    },
  },
  blockExplorers: {
    etherscan: {
      name: "Manta Pacific",
      url: "https://pacific-explorer.manta.network/",
    },
    default: {
      name: "Manta Pacific",
      url: "https://pacific-explorer.manta.network/",
    },
  },
} as const;