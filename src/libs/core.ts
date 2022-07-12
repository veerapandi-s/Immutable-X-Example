import { JsonRpcProvider } from '@ethersproject/providers';
import { Core__factory } from '@imtbl/core-sdk';
import { utils } from 'ethers';
import env from '../config/client';
import { getWallet } from './helper';
import { requireEnvironmentVariable } from './utils';

const rpcProvider = requireEnvironmentVariable('RPC_PROVIDER');
const provider = new JsonRpcProvider(rpcProvider);
// User PrivateKey
const privateKey = requireEnvironmentVariable('OWNER_ACCOUNT_PRIVATE_KEY');
// User L1 Wallet
const signer = getWallet(privateKey, provider);
// Get instance of core contract
const contract = Core__factory.connect("0xccc8cb5229b0ac8069c51fd58367fd1e622afd97", signer);


export const listenEvent = () => {
    try {
        const filter = {
            topics: [
                utils.id("Transfer(address,address,uint256)")
            ]
        }
        // provider.on(filter, (log, event) => {
        //     // Emitted on every block change
        //     console.log(log, event);

        // })
        const ab = Core__factory.abi
        contract.on(filter,() => {
            console.log("EVent"); 
        })
        // contract.queryFilter("Transfer")

        // contract.on("", (to, amount, from) => {
        //     console.log(to, amount, from);
        // });
    } catch (error) {
        console.error("Error in contract call", error);

    }
    console.log("After event listen");

}
