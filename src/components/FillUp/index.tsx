import * as Component from './styles';
import ChainsWeb3 from '../../config/chains.json';
import { createRef, MutableRefObject, useContext, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { BalanceContext } from '../../context/BalanceContext';
import { BigNumber, ethers } from 'ethers';
import { userProofOfWork } from '../../utils/pow';
import useMessage from '../../hooks/message';
import LoadingIcon from '../LoadingIcon';
import {changeAddress, fillUpChains} from '../../utils/analytics';
import ChainList from '../ChainList';

interface IChain {
    isLoading: boolean;
    isEmpty: boolean;
    isFilled: boolean;
    chainId: string;
}

type ChainList = {[key: string]: IChain};

let DEFAULT_CHAINS: ChainList = {};

const default_values = {
    isLoading: false,
    isEmpty: false,
    isFilled: false
}
Object.entries(ChainsWeb3.mainnet).forEach((v) => {
    DEFAULT_CHAINS[v[0]] = {
        ...default_values,
        chainId: v[0],
    };
});


export default function FillUp() {
    
    const { chains, setBalance } = useContext(BalanceContext);

    /**
     *
     * Default Account
     * @dev Required currently without captcha check
     *
    **/
    const { address }  = useAccount();
    const [ message, setMessage ] = useMessage(); 
    const [ account, setAccount ] = useState<string | undefined>(address);
    const [ fillStatus, setFillStatus ] = useState<string>("unfilled");

    useEffect(() => {
        const getBalances = async() => {
            let _chains = (chains) as any;
            const balances = await Promise.all(Object.entries(_chains['current']).map(async(v) => {
                const provider = new ethers.providers.JsonRpcProvider((v[1] as any)[1]['urls'][0]);
                if (!address) {
                    return {
                        chainId: v[0],
                        value: BigNumber.from(0)
                    }
                }

                return {
                    chainId: v[0],
                    value: await (provider.getBalance(address))
                };
            }));
            
            balances.forEach((v) => {
                setBalance(v.chainId, v.value);
            })
        }

        const isValidAddress = () => {
            if (!account) {
                setMessage({
                    message: "Invalid Address",
                    color: "red"
                });
            } else if (!ethers.utils.isAddress(account)) {
                setMessage({
                    message: "Invalid Address",
                    color: "red"
                });
            } else {
                if (message) setTimeout(() => setMessage(undefined), 1500);
                changeAddress("Ethereum Address", [account]);
            }
        }
        isValidAddress();
        getBalances();
    }, [account]);
    
    const fillUp = async() => {
        setFillStatus("filling");
        try {

            if (!address || !account) {
                throw new Error("Please connect a wallet");
            }

            if (!ethers.utils.isAddress(account)) {
                throw new Error("Invalid Ethereum Address");
            }

            const res = await userProofOfWork({
                account: account,
                isMainnet: true
            });

            let successScript = "";

            res.forEach((v: any) => {
                if (v['action'] === 0) {
                    successScript += v['name'] + ", ";
                }
            });
            
            setMessage({
                message: "Wallet Filled Up On: " + successScript.substring(0, successScript.length-2),
                color: 'green'
            });
            fillUpChains(`Address: ${account}`, successScript.substring(0, successScript.length -2).split(','));
            setFillStatus("filled");

        } catch (err: any) {
            setMessage({
                message: err.toString(),
                color: "red"
            });
            setTimeout(() => setMessage(undefined), 1500);
            setFillStatus("unfilled");
        }
    }

    /**
     *
     * @function Quick Out w/out Address
     * @deprecated Future Deprecation Planned
    **/
    if (!address) return <div></div>;
    
       
    return (
        <Component.Container>
            <Component.Centered>
                <Component.Title>Ready to <strong>FUEL</strong> Up?</Component.Title>
                <Component.Slogan>Click Fuel Wallet to automatically fill up across all supported SKALE Chains. Want to fill up a different address? Copy and paste it in</Component.Slogan>
                <span style={{ height: '15px' }} />
                <Component.FillRow>
                    <Component.AddressInput type="text" value={account} onChange={(e: any) => {
                        e.preventDefault();
                        setAccount(e.target.value);
                    }} />
                    <Component.FillAllButton onClick={async (e) => {
                        e.preventDefault();
                        if (fillStatus !== "unfilled") return;
                        await fillUp();
                    }}><FillStatus status={fillStatus} /></Component.FillAllButton>
                </Component.FillRow>
                {message && (<Component.FillRow>
                    <Component.Message color={message.color}>{message.message}</Component.Message>
                </Component.FillRow>)}
            </Component.Centered>
            <ChainList />
            {/*// <Component.ChainStatusList>
            //     {Object.entries(ChainsWeb3.mainnet).map((v: any, index: number) => {
            //         let textColor = 'var(--text-color)';
            //         return <Component.ChainStatus key={index} color={textColor}>{v[1].name}</Component.ChainStatus>
            //     })} 
            // </Component.ChainStatusList> */}
        </Component.Container>
    );
}

const FillStatus = ({ status }: { status: string }) => {
    
    if (status === "filled") {
        return <strong>Fueled Up</strong>;
    } else if (status === "unfilled") {
        return <strong>Fuel Wallet</strong>;
    } else if (status === "filling") {
        return <LoadingIcon />;
    } else {
        return <strong>Error</strong>;
    }

}
