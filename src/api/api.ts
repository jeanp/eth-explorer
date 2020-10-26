import { toQueryParams } from "helpers/to-query-params"
import { AccountBalanceApiResponse, AccountTransactionsApiResponse, GetAccountTxOptions, Network } from "./types";

const getAPIUrlByNetwork = (network: Network): string => {
  switch (network) {
    case Network.RINKEBY:
      return "http://api-rinkeby.etherscan.io/api"
    default:
      return "http://api.etherscan.io/api";
  }
}


export const getAccountBalance = async (address: string, network: Network = Network.MAINNET): Promise<AccountBalanceApiResponse> => {
  const url = getAPIUrlByNetwork(network)
  const apiKey = process.env.REACT_APP_API_KEY;
  const queryOptions = toQueryParams({});
  
  try { 
    const response = await fetch(`${url}?module=account&action=balance&address=${address}&apiKey=${apiKey}&${queryOptions}`)
    return await response.json()
  } catch (err) {
    console.warn("Network error whenon getAccountBalance", address, err)
  }

  return {
    status: 0,
    message: "",
    result: ""
  }
}

export const getAccountTransactions = async (address: string, network: Network = Network.MAINNET, options: GetAccountTxOptions = {} ): Promise<AccountTransactionsApiResponse> => {
  const url = getAPIUrlByNetwork(network)
  const apiKey = process.env.REACT_APP_API_KEY;
  const queryOptions = toQueryParams({
    sort: "desc",
    page: 1,
    offset: 10,
    ...options
  });
  
  try { 
    const response = await fetch(`${url}?module=account&action=txlist&address=${address}&apiKey=${apiKey}&${queryOptions}`)
    return await response.json()
  } catch (err) {
    console.warn("Network error whenon getAccountBalance", address, err)
  }

  return {
    status: 0,
    message: "",
    result: []
  }

}