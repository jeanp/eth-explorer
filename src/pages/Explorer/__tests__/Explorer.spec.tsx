import React from "react";
import { render } from "test-utils";
import userEvent from "@testing-library/user-event";

import Explorer from "../Explorer";
import { Network } from "api/types";

const mockExplorerProps = {
  address: "0xfFfa5813ED9a5DB4880D7303DB7d0cBe41bC771F",
  transactions: [
    {
      blockNumber: "blockNumber",
      timeStamp: "timeStamp",
      hash: "hash",
      nonce: "nonce",
      blockHash: "blockHash",
      transactionIndex: "transactionIndex",
      from: "from",
      to: "to",
      value: "value",
      gas: "gas",
      gasPrice: "gasPrice",
      isError: "isError",
      txreceipt_status: "txreceipt_status",
      input: "input",
      contractAddress: "contractAddress",
      cumulativeGasUsed: "cumulativeGasUsed",
      gasUsed: "gasUsed",
      confirmations: "confirmations",
    },
  ],
  network: Network.MAINNET,
  balance: "100",
  isLoading: false,
};

describe("Explorer", () => {
  it("should have a link to the QR Code", async () => {
    const { getByTestId, getByRole } = render(
      <Explorer {...mockExplorerProps} />
    );
    const qrCodelink = getByTestId("address-qrcode-modal-link");
    await userEvent.click(qrCodelink);

    const qrCode = getByRole("img");
    expect(qrCode).toHaveAttribute(
      "src",
      "https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=0xfFfa5813ED9a5DB4880D7303DB7d0cBe41bC771F&choe=UTF-8"
    );
  });

  it("should render balance", () => {
    const { getByTestId } = render(<Explorer {...mockExplorerProps} />);
    const balanceEl = getByTestId("balance");
    expect(balanceEl).toHaveTextContent("Balance100 ETH");
  });

  it("should render transactions", () => {
    const { getByTestId } = render(<Explorer {...mockExplorerProps} />);
    expect(getByTestId("transaction-hash")).toBeInTheDocument();
  });
});
