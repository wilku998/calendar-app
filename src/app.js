import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import "normalize.css/normalize.css";
import "./styles/style.scss";
import styled, { ThemeProvider } from "styled-components";

import theme from "./styledComponentsTheme/styledComponentsTheme";
import configureStore from "./store/configureStore";
import Calendar from "./components/Calendar/Calendar";
import SubNavigation from "./components/SubNavigation";
import Navigation from "./components/Navigation/Navigation";
import { setItems } from "./actions/items";
import CalendarModal from "./components/CalendarModal/CalendarModal";

const store = configureStore();

const App = () => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <CalendarModal />
      <Navigation />
      <SubNavigation />
      <Main>
        <Calendar />
      </Main>
    </Fragment>
  </ThemeProvider>
);

const Main = styled.main`
  margin-left: 25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colorGreyDark2};
`;

const AppRouter = () => (
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>
);

const renderApp = () => {
  ReactDOM.render(<AppRouter />, document.getElementById("root"));
};
// renderApp()
store.dispatch(setItems(["tasks", "incomes", "expenses"])).then(() => {
  renderApp();
});
