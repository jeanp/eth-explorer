import React, { useMemo } from "react";
import Modal from "react-modal";
import { styles } from "./styles";

type QRCodeModal = {
  ethAddress: string;
  isOpen: boolean;
  onRequestClose: () => void;
};

const QRCodeModal: React.FC<QRCodeModal> = ({
  isOpen,
  onRequestClose = () => {},
  ethAddress,
}) => {
  const chartAddress = useMemo(
    () =>
      `https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${ethAddress}&choe=UTF-8`,
    [ethAddress]
  );

  return (
    <Modal style={styles} isOpen={isOpen} onRequestClose={onRequestClose}>
      <span>
        <img src={chartAddress} alt={ethAddress} />
      </span>
      <br />
      <button onClick={onRequestClose}>close</button>
    </Modal>
  );
};

export default QRCodeModal;
