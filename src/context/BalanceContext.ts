import { BigNumber } from "ethers";
import { createContext } from "react";

export const BalanceContext = createContext({
    chains: {},
    setBalance: (chainId: string, value: BigNumber) => {} 
});
