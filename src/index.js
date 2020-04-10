import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorkers";

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

serviceWorker.register();
