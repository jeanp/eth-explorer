
import styled from "styled-components";

export const Input = styled.input`
  border: 1px solid black;
  border-radius: 6px;
  height: 31px;
  padding: 2px 6px;
  width: 300px;
  margin-right: 10px;
  margin-top: 20px;
`;

export const Select = styled.select`
  border: 1px solid black;
  border-radius: 6px;
  height: 37px;
  padding: 2px 6px;
  margin-right: 10px;
  margin-top: 20px;
`;

export const Button = styled.button`
  border: 1px solid black;
  border-radius: 6px;
  height: 37px;
  padding: 2px 6px;
  margin-top: 20px;
  cursor: pointer;
  padding: 2px 15px;
  margin-right: 10px;

  ${(props) =>
    props.disabled &&
    `
      cursor: auto;
  `}
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Form = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: -20px;
  justify-content: center;
  align-items: center;
`;

export const ErrorWrapper = styled.div`
  color: red;
  padding: 5px;
  height: 12px;
`;

