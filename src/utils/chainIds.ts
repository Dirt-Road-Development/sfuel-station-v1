import Chains from '../config/pow.json';
import { getFileStorage } from './fs_reserve';

interface Params {
    network: "mainnet" | "staging" | "hackathon";
    chainName: string | undefined;
}

export const chainIdFromChainName = (params: Params) : string => {
    let chains: any = {};
    let chainId: string = "";
    if (params.network === "mainnet")
        chains = Chains.mainnet;
    else if (params.network === "staging")
        chains = Chains.staging;
    else
        chains = Chains.hackathon; 

    for (const chain of chains) {
        if (chain.name.toLowerCase() === params.chainName?.toLowerCase()) {
            chainId = chain.chainId;
        }
    }
    
    return chainId;

}
