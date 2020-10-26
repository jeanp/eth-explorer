import React from "react";
import { render } from "test-utils";
import userEvent from "@testing-library/user-event";

import { useParams } from "react-router-dom";
import { useQueryParams } from "helpers/use-query-params";
import { useSearchHistory } from "hooks/use-search-history";

import SearchForm from "../SearchForm";
import { Network } from "api/types";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn().mockReturnValue({}),
}));

jest.mock("helpers/use-query-params", () => ({
  useQueryParams: jest.fn().mockReturnValue(null),
}));

jest.mock("hooks/use-search-history", () => ({
  useSearchHistory: jest
    .fn()
    .mockReturnValue({ searchHistory: [], addToSearchHistory: jest.fn() }),
}));

describe("SearchForm", () => {
  beforeEach(() => {
    (useQueryParams as jest.MockedFunction<typeof useQueryParams>).mockClear();
    (useQueryParams as jest.MockedFunction<typeof useQueryParams>).mockClear();
  });

  it("should have search button disabled if address is empty", () => {
    const { getByRole } = render(<SearchForm />);
    const searchBtn = getByRole("button");
    const addressInput = getByRole("textbox");
    expect(addressInput).toBeEmpty();
    expect(searchBtn).toHaveAttribute("disabled");
  });

  it("should allow search when address is not empty", async () => {
    const { getByText, getByRole } = render(<SearchForm />);
    const searchBtn = getByText(/Search/);
    const addressInput = getByRole("textbox");

    await userEvent.type(
      addressInput,
      "0xfFfa5813ED9a5DB4880D7303DB7d0cBe41bC771F"
    );

    expect(addressInput.value).toBe(
      "0xfFfa5813ED9a5DB4880D7303DB7d0cBe41bC771F"
    );
    expect(searchBtn).not.toHaveAttribute("disabled");
  });

  it("should be possible to select different networks", async () => {
    const { getByRole } = render(<SearchForm />);
    const networksInput = getByRole("combobox");

    expect(networksInput.value).toBe("Rinkeby");

    await userEvent.selectOptions(networksInput, "Mainnet");
    expect(networksInput.value).toBe("Mainnet");
  });

  describe("History popover", () => {
    it("should not render when empty", () => {
      const { queryByTestId } = render(<SearchForm />);
      expect(queryByTestId("history-popover-button")).not.toBeInTheDocument();
    });

    it("should navigate when clicked", async () => {
      (useSearchHistory as jest.MockedFunction<
        typeof useSearchHistory
      >).mockReturnValue({
        searchHistory: [
          { ethAddress: "test-address", network: Network.RINKEBY },
        ],
        addToSearchHistory: jest.fn(),
      });

      expect(window.location.pathname).toBe("/");

      const { getByTestId, getByRole } = render(<SearchForm />);
      const historyBtn = getByTestId("history-popover-button");
      const addressInput = getByRole("textbox");

      await userEvent.type(
        addressInput,
        "0xfFfa5813ED9a5DB4880D7303DB7d0cBe41bC771F"
      );

      await userEvent.click(historyBtn);

      const item = getByTestId("history-item-test-address");
      expect(item).toBeInTheDocument();

      await userEvent.click(item);
      expect(window.location.pathname).toBe("/explorer/test-address");
      expect(window.location.search).toBe("?network=Rinkeby");
    });
  });

  describe("url parameter", () => {
    it("should read address from url", async () => {
      (useParams as jest.MockedFunction<typeof useParams>).mockImplementation(
        jest.fn(() => ({
          address: "address-from-test",
        }))
      );

      const { getByRole } = render(<SearchForm />);
      const addressInput = getByRole("textbox");
      expect(addressInput.value).toBe("address-from-test");
    });

    it("should read address network url", () => {
      (useQueryParams as jest.MockedFunction<
        typeof useQueryParams
      >).mockImplementation(() => "Mainnet");

      const { getByRole } = render(<SearchForm />);
      const networkInput = getByRole("combobox");
      expect(networkInput.value).toBe("Mainnet");
    });

    it("should validate address", async () => {
      const { getByText, getByRole, getByTestId } = render(<SearchForm />);
      const searchBtn = getByText(/Search/);
      const addressInput = getByRole("textbox");

      await userEvent.type(addressInput, "abc");

      await userEvent.click(searchBtn);

      const errorEl = getByTestId("error-message");
      expect(errorEl).toHaveTextContent(
        "Seems like this isnt a valid ETH address"
      );
    });

    it("should redirect to explorer when clicked", async () => {
      const { getByText, getByRole } = render(<SearchForm />);
      const searchBtn = getByText(/Search/);
      const addressInput = getByRole("textbox");

      await userEvent.type(
        addressInput,
        "0xfFfa5813ED9a5DB4880D7303DB7d0cBe41bC771F"
      );
      await userEvent.click(searchBtn);

      expect(window.location.pathname).toBe(
        "/explorer/0xfFfa5813ED9a5DB4880D7303DB7d0cBe41bC771F"
      );
      expect(window.location.search).toBe("?network=Mainnet");
    });
  });
});
