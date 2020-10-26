import React, { useMemo, useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { HistoryItem } from "./types";
import { Item } from "./Item";

type HistoryPopoverRenderProp = {
  isVisible: boolean;
  doShow: () => void;
  doHide: () => void;
};

type HistoryPopoverProps = {
  onItemClick: (item: HistoryItem) => void;
  items: HistoryItem[];
  children: (props: HistoryPopoverRenderProp) => React.ReactElement;
};

const HistoryPopover: React.FC<HistoryPopoverProps> = ({
  items,
  children,
  onItemClick,
}) => {
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  const content = useMemo(
    () =>
      items.map((item, idx) => (
        <Item
          key={idx}
          data-testid={`history-item-${item.ethAddress}`}
          onClick={() => {
            hide();
            onItemClick(item);
          }}
        >
          {item.ethAddress} @ {item.network}
        </Item>
      )),
    [items, onItemClick]
  );

  return (
    <Tippy visible={visible} content={content} placement="bottom">
      {children({ isVisible: visible, doShow: show, doHide: hide })}
    </Tippy>
  );
};

export default HistoryPopover;
