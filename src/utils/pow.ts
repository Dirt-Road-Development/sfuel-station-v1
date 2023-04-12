import PowChains from '../config/pow.json';
import Web3 from 'web3';
import mineGasForTransaction from './miner';
import { Wallet } from '@ethersproject/wallet';
import BN from 'bn.js';
import { BigNumber, ethers } from 'ethers';

interface Params {
    account: string;
    network: "mainnet" | "staging" | "hackathon";
    chainId?: string | undefined;
}

export async function manualFillUp(params: Params) : Promise<{ action: 0 | 1, name: string }[]> {
    
    const wallet = new Wallet(process.env.REACT_APP_STAGING_PK as string);
    const chains = PowChains[params.network];
    
    const selectedChainId = params.chainId;
    let availableChains = chains.filter((v) => !selectedChainId || v.chainId === selectedChainId);

    const txs = await Promise.all(availableChains.map((chain) => {
        const chainWallet = wallet.connect(new ethers.providers.JsonRpcProvider(chain.rpc));

        try {
            return chainWallet.sendTransaction({
                to: chain.public.address,
                data: "0x0c11dedd" + "000000000000000000000000" + params.account.substring(2)
            });
        } catch (err) {
            return false;
        }
    }))

    return txs.map((v, index) => {
        return {
            action: v ? 0 : 1,
            name: availableChains[index].name
        }
    });
}


export const userProofOfWork = async (params: Params) : Promise<any> => {

    try {
        if (params.network === "staging") return await manualFillUp(params);

        const web3 = new Web3();

        const randomSignerWallet = Wallet.createRandom();
        
        const randomSignerPrivatekey = randomSignerWallet.privateKey;
        const randomSignerAddress = randomSignerWallet.address;
    
        let nonce = new BN(0);
        let gas = new BN(100000);
    
        const gasPrice: string = await mineGasForTransaction(web3, nonce, gas, randomSignerAddress);
        
        const chains = PowChains[params.network];
        const selectedChainId = params.chainId;
        let availableChains = chains.filter((v) => !selectedChainId || v.chainId === selectedChainId);
        let configurations = await Promise.all(availableChains.map(async(v) => {
            const provider = new ethers.providers.JsonRpcProvider(v.rpc);
            const wallet = new Wallet(randomSignerPrivatekey, provider);
            return {
                chain: v,
                wallet,
                nonce: await wallet.getTransactionCount(),
                info: {
                    name: v.name
                }
            };
        }));
    
        const txs = await Promise.all(configurations.map(({ wallet, nonce, chain }: {
            chain: {
                chainId: string;
                name: string;
                rpc: string;
                public: {
                    address: string;
                    fnHash: string;
                    maxFuel: string;
                };
            };
            wallet: Wallet,
            nonce: number,
        }) => {
            
            try {
                return wallet.sendTransaction({
                    to: chain.public.address,
                    data: "0x0c11dedd" + "000000000000000000000000" + params.account.substring(2),
                    nonce,
                    gasPrice: BigNumber.from(gasPrice),
                    gasLimit: 65000
                });
            } catch (err) {
                return false;
            }
        }))
        
        return txs.map((v, index) => {
            return {
                action: v ? 0 : 1,
                name: configurations[index].chain.name
            }
        })
    
    } catch (err) {
        console.error(err);
        throw err;
    }
}


export const devProofOfWork = async(params: Params) : Promise<any> => {}