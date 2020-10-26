import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { AccountTransaction, Network } from "api/types";
import { PageLayout } from "common/styles";
import { Header } from "components/Header";
import { Section } from "components/Section";
import { QRCodeModal } from "components/QRCodeModal";
import { QRCodeLink } from "./styles";

interface AddressProps {
  isLoading: boolean;
  address: string;
  network: Network;
  balance: string;
  transactions: AccountTransaction[];
}

const Address: React.FC<AddressProps> = ({
  isLoading,
  address,
  balance,
  transactions,
  network,
}) => {
  const withAddressLink = (address: string) => (
    <Link to={`/explorer/${address}?network=${network}`}>{address}</Link>
  );

  const [isQRCodeModalOpen, setQRCodeModalOpen] = useState(false);
  const onQRCodeModalClose = useCallback(() => setQRCodeModalOpen(false), []);
  const onQRCodeModalOpen = useCallback(() => setQRCodeModalOpen(true), []);

  return (
    <PageLayout>
      <Header />
      {isLoading && <span> Loading... </span>}
      {!isLoading && (
        <span>
          <Section title="Address" data-testid="address">
            <QRCodeLink
              data-testid="address-qrcode-modal-link"
              onClick={onQRCodeModalOpen}
            >
              {address}
            </QRCodeLink>
          </Section>
          <Section title="Balance" data-testid="balance">
            {balance} ETH
          </Section>
          <Section title="Transactions" data-testid="transactions">
            {transactions?.map((transaction) => (
              <span
                key={transaction.hash}
                data-testid={`transaction-${transaction.hash}`}
              >
                <Section.Item label="Hash" value={transaction.hash} />
                <Section.Item label="Block" value={transaction.blockNumber} />
                <Section.Item label="Age" value={transaction.timeStamp} />
                <Section.Item
                  label="From"
                  value={withAddressLink(transaction.from)}
                />
                <Section.Item
                  label="To"
                  value={withAddressLink(transaction.to)}
                />
                <Section.Item label="Value" value={transaction.value} />
                <Section.Item
                  label="Confirmations"
                  value={transaction.confirmations}
                />
                <hr />
              </span>
            ))}
          </Section>
        </span>
      )}
      <QRCodeModal
        isOpen={isQRCodeModalOpen}
        ethAddress={address}
        onRequestClose={onQRCodeModalClose}
      />
    </PageLayout>
  );
};

export default Address;
