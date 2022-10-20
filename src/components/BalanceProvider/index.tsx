import { BalanceContext } from '../../context/BalanceContext';
import Chains from '../../config/chains.json';
import { useEffect, useRef } from 'react';
import { BigNumber } from 'ethers';

export default function BalanceProvider({ children }: { children: JSX.Element | JSX.Element[] }) {
    
    const chains = useRef<any>({});

    useEffect(() => {
        Object.entries(Chains.mainnet).forEach((v) => {
            const [ chainId, chainConfig ] = Object.entries(v);

            chains.current[chainId[1].toString()] = {
                ...chainConfig,
                balance: BigNumber.from(0)
            };
        })
    }, [])

    const setBalance = (chainId: string, value: BigNumber) : void => {
        chains.current[chainId].balance = value;
    }

    return (

        <BalanceContext.Provider value={{ chains, setBalance }}>
            {children}
        </BalanceContext.Provider>
    );

}
