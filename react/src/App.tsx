import { sdk } from "@farcaster/miniapp-sdk";
import { useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import ConnectMenu from "./components/ConnectMenu";
import Home from "./pages/Home";
import RegisterMiniApp from "./pages/RegisterMiniApp";
import MiniAppDetail from "./pages/MiniAppDetail";
import MyReviews from "./pages/MyReviews";

function App() {
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  return (
   <HashRouter>
      <ConnectMenu />
      <Routes>
        <Route
          path="/myreviews"
          element={<MyReviews />} />
        <Route
          path="/app/:id"
          element={<MiniAppDetail />} />
        <Route
          path="/register"
          element={<RegisterMiniApp />} />
        <Route
          path="/"
          element={<Home />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
