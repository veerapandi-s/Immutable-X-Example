import { JsonRpcProvider } from '@ethersproject/providers';
import { Core__factory } from '@imtbl/core-sdk';
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
const contract = Core__factory.connect(env.client.starkContractAddress, signer);


export const listenEvent = () => {
    const stat = contract.filters.LogDeposit().topics
    
    contract.on("AssetMinted",(to, id, blueprint) => {
        console.log(to);
        console.log(id);
        console.log(blueprint);
        
        
    })
}
