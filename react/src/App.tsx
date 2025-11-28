import { sdk } from "@farcaster/miniapp-sdk";
import { useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import { ConnectMenu } from "./components/ConnectMenu";
import Home from "./pages/Home";

function App() {
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  return (
   <HashRouter>
      <ConnectMenu />
      <Routes>
        <Route
          path="/"
          element={<Home />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
