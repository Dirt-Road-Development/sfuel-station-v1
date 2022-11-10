import { Wallet, Contract, BigNumber } from 'ethers';
import FileStorageABI from '../../fs.abi.json';

const MB: BigNumber = BigNumber.from(2).pow(20);
const DEFAULT_AMOUNT: BigNumber = BigNumber.from(300);
const ALLOCATION: BigNumber = DEFAULT_AMOUNT.mul(MB);

interface Params {
    to: string;
}

export const getFileStorage = async(params: Params) => {

    const HackathonSigner = process.env.REACT_APP_HACKATHON_SIGNER as string; 
    
    const signer = new Wallet(HackathonSigner);

    const fs = new Contract("", FileStorageABI, signer);

    const to: string = params.to;
    
    const currentReservedAmount: BigNumber = await fs.callStatic.getOccupiedSpace(to);

    const total: BigNumber = currentReservedAmount.add(ALLOCATION);

    const reserveResult = await fs.reserveSpace(to, total);

    const res = await reserveResult.wait("ok");

    return res;
}
