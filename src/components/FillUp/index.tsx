import * as Component from './styles';
import ChainsWeb3 from '../../config/chains.json';
import { createRef, MutableRefObject, useContext, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { BalanceContext } from '../../context/BalanceContext';
import { BigNumber, ethers } from 'ethers';
import { userProofOfWork } from '../../utils/pow';

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
    
    // const [chainList, setChainList] = useState<ChainList>(DEFAULT_CHAINS);
    // const { isDarkTheme } = useContext(ThemeContext);
    const { chains, setBalance } = useContext(BalanceContext);

    /**
     *
     * Default Account
     * @dev Required currently without captcha check
     *
    **/
    const { address }  = useAccount();
    
    const addressRef = createRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;

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

        getBalances();
    }, [address]);
    
    const fillUp = async() => {

        try {

            if (!address) {
                throw new Error("Please connect a wallet");
            }

            const res = await userProofOfWork({
                account: address,
                isMainnet: true
            });
        } catch (err) {
            console.log("Error: ", err);
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
                    <Component.AddressInput type="text" defaultValue={address} ref={addressRef} />
                    <Component.FillAllButton onClick={async (e) => {
                        e.preventDefault();
                        await fillUp();
                    }}><strong>FUEL Wallet</strong></Component.FillAllButton>
                </Component.FillRow>
            </Component.Centered>
            <Component.ChainStatusList>
                {Object.entries(ChainsWeb3.mainnet).map((v: any, index: number) => {
                    // const balance = (chains as any).current[v[0]];
                    let textColor = 'var(--text-color)';
                    return <Component.ChainStatus key={index} color={textColor}>{v[1].name}</Component.ChainStatus>
                })} 
            </Component.ChainStatusList>
        </Component.Container>
    );
}
