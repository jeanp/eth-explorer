import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Explorer from "./Explorer";
import { AccountTransaction, Network } from "api/types";
import { useQueryParams } from "helpers/use-query-params";
import { doFetchData } from "./actions";

interface AddressParams {
  address: string;
}

const getNetwork = (network: string | null) =>
  network === Network.RINKEBY ? Network.RINKEBY : Network.MAINNET;

const ExplorerContainer: React.FC = () => {
  const history = useHistory();
  const { address } = useParams<AddressParams>();
  const network = useQueryParams("network");

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [balance, setBalance] = useState<string>("0");
  const [transactions, setTransactions] = useState<AccountTransaction[]>([]);

  useEffect(() => {
    if (!address) history.push("/");

    const doFetch = async () => {
      setIsLoading(true);
      try {
        const { balance, transactions } = await doFetchData(
          address,
          getNetwork(network)
        );

        setBalance(balance);
        setTransactions(transactions);
      } finally {
        setIsLoading(false);
      }
    };

    doFetch();
  }, [address, history, network]);

  return (
    <Explorer
      address={address}
      balance={balance}
      network={getNetwork(network)}
      transactions={transactions}
      isLoading={isLoading}
    />
  );
};

export default ExplorerContainer;
