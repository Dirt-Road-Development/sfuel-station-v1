import BN from 'bn.js';
import Web3 from 'web3';
import * as crypto from 'crypto';

const DIFFICULTY = new BN(1);

async function mineGasForTransaction(web3: Web3, nonce: any, gas: any, from: string) : Promise<any> {
    let address = from;
    nonce = web3.utils.isHex(nonce) ? web3.utils.hexToNumber(nonce) : nonce;
    gas = web3.utils.isHex(gas) ? web3.utils.hexToNumber(gas) : gas;
    return  mineFreeGas(gas, address, nonce, web3);
}

function mineFreeGas(gasAmount: any, address: any, nonce: any, web3: any) {
    let nonceHash = new BN(web3.utils.soliditySha3(nonce).slice(2), 16)
    let addressHash = new BN(web3.utils.soliditySha3(address).slice(2), 16)
    let nonceAddressXOR = nonceHash.xor(addressHash)
    let maxNumber = new BN(2).pow(new BN(256)).sub(new BN(1));
    let divConstant = maxNumber.div(DIFFICULTY);
    let candidate: any;
    while (true) {
        candidate = new BN(crypto.randomBytes(32).toString('hex'), 16);
        let candidateHash = new BN(web3.utils.soliditySha3(candidate).slice(2), 16);
        let resultHash = nonceAddressXOR.xor(candidateHash);
        let externalGas = divConstant.div(resultHash).toNumber();
        if (externalGas >= gasAmount) {
            break;
        }
    }
    console.log("Candidate: ", candidate.toString());
    return candidate.toString();
}

export default mineGasForTransaction;
