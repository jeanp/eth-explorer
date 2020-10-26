import React from "react";
import { render } from "test-utils";

import * as actions from "../actions";

import ExplorerContainer from "../ExplorerContainer";
import { act } from "react-dom/test-utils";

jest.spyOn(actions, "doFetchData");

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn().mockReturnValue({
    address: "test-address",
  }),
}));

jest.mock("helpers/use-query-params", () => ({
  useQueryParams: jest.fn().mockReturnValue({ network: "Mainnet" }),
}));

jest.mock("../Explorer", () => (props: any) => {
  return <>{JSON.stringify(props)}</>;
});

describe("ExplorerContainer", () => {
  it("should fetch the data on render", async () => {
    await act(async () => {
      await render(<ExplorerContainer />);
    });

    expect(actions.doFetchData).toHaveBeenCalledWith("test-address", "Mainnet");
  });

  it("should pass all the parameters", () => {
    expect(render(<ExplorerContainer />)).toMatchSnapshot();
  });
});
