import { JsonRpcProvider } from '@ethersproject/providers';
import { requireEnvironmentVariable } from '../libs/utils';
import { isImmutableUser, getWallet, initiateUser, createImmutableUser, depositETH, depositERC20, sendERC20, sendNativeToken } from 'libs/helper';
import { listenEvent } from 'libs/core';


const rpcProvider = requireEnvironmentVariable('RPC_PROVIDER');
const provider = new JsonRpcProvider(rpcProvider);

(async () => {
    // User PrivateKey
    const privateKey = requireEnvironmentVariable('OWNER_ACCOUNT_PRIVATE_KEY');
    // User L1 Wallet
    const wallet = getWallet(privateKey, provider);
    // IMX Client
    const user = await initiateUser(wallet);
    // Check for IMX Registration
    const isUser = await isImmutableUser(user);
    // Create User in Immutable L2 If not registered already
    if (!isUser) await createImmutableUser(user);

    // listenEvent()

    // Deposit Native Token to Immutable L2
    // await depositETH(user,"0.01") 

    // Deposit ERC20 Token
    // await depositERC20(user, "1", "TST", "0x071e842e2c71CF22E40Df4f1a3744377E5bC6b5A", 18);

    // Send ERC20 Token
    // await sendERC20(user, "0x071e842e2c71CF22E40Df4f1a3744377E5bC6b5A", "1", "TST", "0x071e842e2c71CF22E40Df4f1a3744377E5bC6b5A", 18);

    // Send Native Token
    // await sendNativeToken(user, "0x071e842e2c71CF22E40Df4f1a3744377E5bC6b5A", "0.01")
    
    console.log(`Client Address`, user.address);
})().catch(e => {
    console.error("Error", e);
})
