// @ts-nocheck
import React from "react";
import { render } from "@testing-library/react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const App = ({ children }) => {
  return <Router>{children}</Router>;
};

const customRender = (ui, options = {}) =>
  render(ui, { wrapper: App, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
