import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { WatchListContextProvider } from '../context/watchListContext';

const RootWrapper = ({ children }) => {
  return (
    <Router>
      <WatchListContextProvider >
        {children}
        
      </WatchListContextProvider>
    </Router>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: RootWrapper, ...options });

export * from "@testing-library/react";

export { customRender as render };
