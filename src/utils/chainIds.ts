import Chains from '../config/pow.json';

interface Params {
    network: "mainnet" | "staging" | "hackathon";
    chainName: string | undefined;
}

export const chainIdFromChainName = (params: Params) : string => {
    let chains = getChains(params.network);
    let chainId: string = "";

    for (const chain of chains) {
        if (chain.name.toLowerCase() === params.chainName?.toLowerCase()) {
            chainId = chain.chainId;
        }
    }
    
    return chainId;
}

export const chainNameExist = (params: Params) : boolean => {
    let chains = getChains(params.network);

    for (const chain of chains) {
        if (chain.name.toLowerCase() === params.chainName?.toLowerCase()) {
            return true;
        }
    }
    
    return false;
}

function getChains(network: "mainnet" | "staging" | "hackathon") {
    let chains: any = {};
    if (network === "mainnet")
        chains = Chains.mainnet;
    else if (network === "staging")
        chains = Chains.staging;
    else
        chains = Chains.hackathon;
    return chains;
}
