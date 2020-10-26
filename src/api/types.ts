export type Options = {
  sort: string
}

export type AccountBalanceApiResponse = {
  status: number,
  message: string,
  result: string
}

export type AccountTransaction = {
  blockNumber: string,
  timeStamp: string,
  hash: string,
  nonce: string,
  blockHash: string,
  transactionIndex: string,
  from: string,
  to: string,
  value: string,
  gas: string,
  gasPrice: string,
  isError: string,
  txreceipt_status: string,
  input: string,
  contractAddress: string,
  cumulativeGasUsed: string,
  gasUsed: string,
  confirmations: string
}

export type AccountTransactionsApiResponse = {
  status: number,
  message: string,
  result: AccountTransaction[]
}

export type GetAccountTxOptions = {
  sort?: "desc" | "asc",
  offset?: number,
  page?: number,
}

export enum Network {
  RINKEBY = "Rinkeby",
  MAINNET = "Mainnet",
}