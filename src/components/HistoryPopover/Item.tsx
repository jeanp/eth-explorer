import React from "react";
import styled from "styled-components";

type ItemProps = {
  onClick: () => void;
};

export const ItemWrapper = styled.div`
  padding 5px;
  cursor: pointer !important;
  pointer-events: all;
  z-index: 9999;

  &:hover {
    color: red;
  }
`;

export const Item: React.FC<ItemProps> = ({ onClick, children, ...props }) => (
  <ItemWrapper onClick={onClick} {...props}>
    {children}
  </ItemWrapper>
);
