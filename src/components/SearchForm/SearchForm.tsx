import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { useQueryParams } from "helpers/use-query-params";
import { isETHAddress } from "helpers/is-eth-address";
import { Network } from "api/types";
import { useSearchHistory } from "hooks/use-search-history";
import { HistoryItem } from "components/HistoryPopover/types";
import { HistoryPopover } from "components/HistoryPopover";
import { Button, ErrorWrapper, Form, Input, Select, Wrapper } from "./styles";

const getNetwork = (network: string | null) =>
  network === Network.MAINNET ? Network.MAINNET : Network.RINKEBY;

const SearchForm: React.FC = () => {
  const { address: addressParam } = useParams() as { address: string };
  const networkParam = useQueryParams("network");

  const history = useHistory();
  const [network, setNetwork] = useState<Network>(getNetwork(networkParam));
  const [ethAddress, setETHAddress] = useState<string>(addressParam || "");
  const [error, setError] = useState<string | null>();
  const { searchHistory, addToSearchHistory } = useSearchHistory();

  useEffect(() => {
    if (addressParam) setETHAddress(addressParam);
    if (networkParam) setNetwork(getNetwork(networkParam));
  }, [addressParam, networkParam]);

  useEffect(() => {
    if (addressParam && networkParam)
      addToSearchHistory(addressParam, getNetwork(networkParam));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressParam, networkParam]);

  const onNetworkChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = getNetwork(event.target.value);
    setNetwork(value);
  };

  const onETHAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setETHAddress(value);
    setError(null);
  };

  const doSearch = async () => {
    if (!isETHAddress(ethAddress)) {
      setError("Seems like this isnt a valid ETH address");
      return;
    }

    if (!ethAddress) return;
    history.push(`/explorer/${ethAddress}?network=${network}`);
  };

  const handleOnHistoryItemClick = (item: HistoryItem) => {
    history.push(`/explorer/${item.ethAddress}?network=${item.network}`);
  };

  return (
    <Wrapper>
      <h1>ETH Explorer</h1>
      <Form>
        <Wrapper>
          <Input
            type="text"
            placeholder="ETH Address"
            value={ethAddress}
            onChange={onETHAddressChange}
          />
        </Wrapper>
        <Select value={network} onChange={onNetworkChange}>
          <option value={Network.RINKEBY}>Rinkeby</option>
          <option value={Network.MAINNET}>Mainnet</option>
        </Select>
        <Button onClick={doSearch} disabled={!ethAddress}>
          Search
        </Button>
        {searchHistory.length > 0 && (
          <HistoryPopover
            items={searchHistory}
            onItemClick={handleOnHistoryItemClick}
          >
            {({ isVisible, doShow, doHide }) => (
              <Button
                onClick={isVisible ? doHide : doShow}
                disabled={!ethAddress}
                data-testid="history-popover-button"
              >
                {isVisible ? "Hide history" : "Show history"}
              </Button>
            )}
          </HistoryPopover>
        )}
      </Form>
      <ErrorWrapper data-testid="error-message">{error}</ErrorWrapper>
    </Wrapper>
  );
};

export default SearchForm;
