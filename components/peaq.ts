
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
  
  export const Peaq: Chain = {

    id:2241,
    name: "krest",

    nativeCurrency: {
      decimals: 18,
      name: "krest",
      symbol: "KRST",
    },
    rpcUrls: {
      public: {
        http: ["https://erpc-krest.peaq.network"],
      },
      default: {
        http: ["https://erpc-krest.peaq.network"],
      },
    },
    blockExplorers: {
      etherscan: {
        name: "krest",
        url: "	https://krest.subscan.io/",
      },
      default: {
        name: "krest",
        url: "	https://krest.subscan.io/",
      },
    },
  } as const;