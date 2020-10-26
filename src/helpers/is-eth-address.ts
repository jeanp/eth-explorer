import isEthereumAddress from 'validator/lib/isEthereumAddress'

export const isETHAddress = (address: string): boolean => isEthereumAddress(address)
