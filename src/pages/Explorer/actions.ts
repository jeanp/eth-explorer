import { getAccountBalance, getAccountTransactions } from "api/api";
import { AccountTransaction, Network } from "api/types";

type FetchData =  {
  balance: string;
  transactions: AccountTransaction[]
} 

const EMPTY = {
  balance: "",
  transactions: [],
}

export const doFetchData = async (address: string, network: Network): Promise<FetchData> => {

  try {
    const balanceData = await getAccountBalance(
      address,
      network
    );

    if (balanceData.message === "NOTOK") {
      return Promise.resolve(EMPTY); //FIXME: this sh ould be handled properly
    }

    const balance = balanceData.result;

    const transactionData = await getAccountTransactions(
      address,
      network
    );

    if (balanceData.message === "NOTOK") {
      return Promise.resolve(EMPTY); //FIXME: this should be handled properly
    }

    const transactions = transactionData.result;

    return {
      balance,
      transactions,
    }
  } catch {
    return Promise.resolve(EMPTY);
  }
};