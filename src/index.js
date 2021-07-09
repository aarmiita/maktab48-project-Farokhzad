import {
  StylesProvider,
  ThemeProvider,
  jssPreset,
} from "@material-ui/core/styles";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { create } from "jss";
import { createMuiTheme } from "@material-ui/core";
import rtl from "jss-rtl";
import { BrowserRouter as Router } from "react-router-dom";
const theme = createMuiTheme({
  direction: "rtl",
});

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <StylesProvider jss={jss}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </StylesProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
