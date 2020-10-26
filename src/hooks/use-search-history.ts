import { useCallback, useState } from 'react';
import { HistoryItem } from 'components/HistoryPopover/types';
import { Network } from 'api/types';

export const useSearchHistory = () => {

  const [searchHistory, setSearchHistory] = useState<HistoryItem[]>([]);
  
  const includeOnSearchHistory = useCallback(
    (newItem: HistoryItem) => {
      const lastItems = searchHistory.slice(0, 4);
      setSearchHistory([newItem, ...lastItems]);
    },
    [searchHistory]
  );

  const addToSearchHistory = (address: string, network: Network): void => {
    const newItem: HistoryItem = {
      ethAddress: address,
      network,
    };

    includeOnSearchHistory(newItem)
  }

  return { searchHistory, addToSearchHistory }
  
}
