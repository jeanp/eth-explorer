import { renderHook } from "@testing-library/react-hooks";
import { Network } from "api/types";
import { useSearchHistory } from "hooks/use-search-history";

import TestRenderer from 'react-test-renderer';
const { act } = TestRenderer;

describe("useSearchHistory", () => {
  it("shouldnt have more than 5 items", async () => {
    const { result } = renderHook(() => useSearchHistory());

    expect(result.current.searchHistory.length).toEqual(0);

    await act(async () => {
      await result.current.addToSearchHistory("1", Network.MAINNET)
      await result.current.addToSearchHistory("2", Network.MAINNET)
      await result.current.addToSearchHistory("3", Network.MAINNET)
      await result.current.addToSearchHistory("4", Network.MAINNET)
      await result.current.addToSearchHistory("5", Network.MAINNET)
      await result.current.addToSearchHistory("6", Network.MAINNET)
    })
    
    expect(result.current.searchHistory.length).toEqual(5);
  });
});
