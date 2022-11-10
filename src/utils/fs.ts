import Chains from '../config/pow.json';
import { getFileStorage } from './fs_reserve';

interface Params {
    to: string;
}

export const userFileStorageReserve = async(params: Params) : Promise<any> => {
    const chains = Chains.hackathon;

    const reservations = await Promise.all(chains.map(async(chain) => {
        return getFileStorage({ to: params.to });
    }))
    
    return reservations;

}
