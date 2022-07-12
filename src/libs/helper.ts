import { JsonRpcProvider } from "@ethersproject/providers";
import { ERC20TokenType, ETHTokenType, ImmutableXClient } from "@imtbl/imx-sdk";
import { Wallet } from "ethers";
import { parseEther } from "ethers/lib/utils";
import env from '../config/client';

export const getWallet = (privateKey: string, provider: JsonRpcProvider): Wallet => {
    try {
        const wallet = new Wallet(privateKey).connect(provider)
        return wallet;
    } catch (error) {
        throw new Error("Cannot get the wallet");
    }
}

export const initiateUser = async (wallet: Wallet): Promise<ImmutableXClient> => {
    try {
        const user = await ImmutableXClient.build({
            ...env.client,
            signer: wallet,
        });
        return user;
    } catch (error) {
        return Promise.reject({
            message: "Couldn't initiate the User",
            rawError: error
        });
    }
}

export const createImmutableUser = async (user: ImmutableXClient) => {
    try {
        const newUser = await user.registerImx({
            etherKey: user.address,
            starkPublicKey: user.starkPublicKey
        });
        return newUser;
    } catch (error) {
        return Promise.reject({
            message: "Couldn't register the user",
            rawError: error
        });
    }
}

export const isImmutableUser = async (user: ImmutableXClient): Promise<boolean> => {
    try {
        const value = await user.isRegistered({
            user: user.address
        });
        return value;
    } catch (error) {
        return Promise.reject({
            message: "Couldn't get the immutable user",
            rawError: error
        });
    }
}

export const depositETH = async (user: ImmutableXClient, token: string) => {
    const value = parseEther(token);
    try {
        const response = await user.deposit({
            quantity: value,
            user: user.address,
            token: {
                type: ETHTokenType.ETH,
                data: {
                    decimals: 18
                }
            }
        })
        return response;
    } catch (error) {
        return Promise.reject({
            message: "Error in deposing funds in immutable",
            rawError: error
        })
    }

}

export const depositERC20 = async (user: ImmutableXClient, token: string, symbol: string, tokenAddress: string, decimals: number = 18) => {
    const value = parseEther(token);
    try {
        const response = await user.deposit({
            user: user.address,
            quantity: value,
            token: {
                type: ERC20TokenType.ERC20,
                data: {
                    symbol: symbol,
                    decimals: decimals,
                    tokenAddress: tokenAddress
                }
            }
        })
        return response;
    } catch (error) {
        return Promise.reject({
            message: "Error in deposing funds in immutable",
            rawError: error
        })
    }
}

export const sendERC20 = async (user: ImmutableXClient, toAddress: string, token: string, symbol: string, tokenAddress: string, decimals: number = 18) => {
    const value = parseEther(token);
    try {
        const response = await user.transfer({
            sender: user.address,
            token: {
                type: ERC20TokenType.ERC20,
                data: {
                    symbol: symbol,
                    decimals: decimals,
                    tokenAddress: tokenAddress
                }
            },
            quantity: value,
            receiver: toAddress
        })
        return response;
    } catch (error) {
        return Promise.reject({
            message: "Error in Sending ERC20 funds in immutable",
            rawError: error
        })
    }
}

export const sendNativeToken = async (user: ImmutableXClient, toAddress: string, token: string, decimals: number = 18) => {
    const value = parseEther(token);
    try {
        const response = await user.transfer({
            sender: user.address,
            token: {
                type: ETHTokenType.ETH,
                data: {
                    decimals: decimals,
                }
            },
            quantity: value,
            receiver: toAddress
        })
        return response;
    } catch (error) {
        return Promise.reject({
            message: "Error in Sending Native funds in immutable",
            rawError: error
        })
    }
}

export const getUserAssets = async (user: ImmutableXClient) => {
    try {
        const assetResp = await user.getAssets({
            user: user.address
        });
        return assetResp;
    } catch (error) {
        return Promise.reject({
            message: "Error in getting the user Assets",
            rawError: error
        })
    }
}

export const getBalances = async (user: ImmutableXClient) => {
    try {
        const balances = await user.listBalances({ user: user.address });
        return balances;
    } catch (error) {
        return Promise.reject({
            message: "Error in getting Balances",
            rawError: error
        })
    }
}
