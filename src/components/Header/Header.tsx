import React from "react";
import { SearchForm } from "../SearchForm";
import { Wrapper } from "./styles";

const Header: React.FC = () => {
  return (
    <Wrapper>
      <SearchForm />
    </Wrapper>
  );
};

export default Header;
