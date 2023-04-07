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

export const userProofOfWork = async (params: Params) : Promise<any> => {

    try {
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
                nonce: await wallet.getTransactionCount()
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
            console.log(chain.name, chain.public.address);
            return wallet.sendTransaction({
                to: chain.public.address,
                data: "0x0c11dedd" + "000000000000000000000000" + params.account.substring(2),
                nonce,
                gasPrice: BigNumber.from(gasPrice)
            });
        }))
    
        
        const wait = await Promise.all(txs.map((tx) => tx.wait(1)));
        console.log("Wait: ", wait);
        return wait;
    } catch (err) {
        console.error(err);
        throw err;
    }
}


export const devProofOfWork = async(params: Params) : Promise<any> => {}

// const transactions = await Promise.all(configurations.map(async(config) => {
    //      return {
    //             signedTx: await config?.web3.eth.accounts.signTransaction({
    //                 from: randomSignerAddress,
    //                 to: config.to,
    //                 data: config.data,
    //                 nonce: nonce.toNumber(),
    //                 gas: gas.toNumber(),
    //                 gasPrice
    //             }, randomSignerPrivatekey),
    //             chain: config?.chain
    //         }

    // }));
    // console.log(123);
    // const fillUps = await Promise.all(transactions.map(async(tx) => {
    //     if (!tx.signedTx?.rawTransaction) {
    //         console.log(345);
    //         return "Error: Raw Transaction Does Not Exist";
    //     }
        
    //     if (!tx.chain) return "No Chain INfo Found";
    //     try {
            
    //         // const w3 = new Web3(tx.chain?.rpc);
    //         console.log("RPC: ", tx.chain?.rpc);
    //         const provider = new ethers.providers.JsonRpcProvider(tx.chain?.rpc);
    //         console.log(tx.signedTx.rawTransaction);
    //         // const res = await w3.eth.sendSignedTransaction(tx.signedTx.rawTransaction);
    //         const res = await provider.sendTransaction(tx.signedTx.rawTransaction);
    //         const wait = await res.wait(1);
    //         console.log("RES: ", res)
    //         console.log("Wait: ", wait);
    //         return {
    //             name: tx.chain,
    //             action: 0
    //         };
    //     } catch (err) {
    //         console.log(err);
    //         return {
    //             name: tx.chain,
    //             action: 1
    //         };
    //     }
    // }));
    // console.log(234);   
    // return fillUps;

    // const configurations = (await Promise.all(chains.map(async(chain) => {
        //     // const w3 = new Web3(chain.rpc);
        //     if (!selectedChainId || chain.chainId === selectedChainId) return chain;
        //     return null;
        //         // return {
        //         //     chain,
        //             // to: chain.public.address,
        //             // data: chain.public.fnHash + "000000000000000000000000" + params.account.substring(2),
        //             // nonce,
        //             // gas,
        //             // gasPrice,
        //             // balance: await w3.eth.getBalance(params.account)
        //         // };
        //     }
        // }))).filter((v) => v !== undefined);