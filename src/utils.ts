import { providers, Contract, BigNumber } from 'ethers';
import { createTransactionEvent } from 'forta-agent';
import * as dotenv from 'dotenv';
import { Wallet } from '@ethersproject/wallet';
import cTokenAbi from './cToken.json';

dotenv.config();

export const createTxEvent = (
  contractAddress: string,
  topics: string[],
  data: string,
) => createTransactionEvent({
  transaction: {
    to: contractAddress,
  } as any,
  receipt: {
    logs: [
      {
        address: contractAddress,
        topics,
        data: '0x' + data,
      }
    ]
  } as any,
  block: {
    timestamp: Math.floor(Date.now()/1000)
  } as any,
});

export const totalBorrowsCurrent = async (cTokenAddress: string): Promise<BigNumber | undefined> =>  {
  try {
    const provider = new providers.JsonRpcProvider(process.env.INFURA_PROVIDER);
    const wallet = new Wallet(`0x${process.env.PRIVATE_KEY}`, provider);
    const cToken = new Contract(cTokenAddress, cTokenAbi, wallet);
  
    const result = await cToken.totalBorrows();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const totalSupplyCurrent = async (cTokenAddress: string): Promise<BigNumber | undefined> =>  {
  try {
    const provider = new providers.JsonRpcProvider(process.env.INFURA_PROVIDER);
    const wallet = new Wallet(`0x${process.env.PRIVATE_KEY}`, provider);
    const cToken = new Contract(cTokenAddress, cTokenAbi, wallet);
  
    const result = await cToken.totalSupply();
    return result;
  } catch (error) {
    console.log(error);
  }
};