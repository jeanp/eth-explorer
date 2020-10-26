import React from "react";
import { ItemTitle, Wrapper } from "./styles";

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

interface SectionComponent extends React.FC<SectionProps> {
  Item: typeof Item;
}

const Section: SectionComponent = ({ title, children, ...props }) => {
  return (
    <Wrapper {...props}>
      <h1>{title}</h1>
      {children}
    </Wrapper>
  );
};

type ItemProps = {
  label: string;
  value: any;
};

const Item: React.FC<ItemProps> = ({ label, value, ...props }) => {
  return (
    <Wrapper {...props}>
      <ItemTitle>{label}</ItemTitle>
      {value}
    </Wrapper>
  );
};

Section.Item = Item;

export default Section;
