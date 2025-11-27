import { sdk } from "@farcaster/miniapp-sdk";
import { useEffect } from "react";

import { ConnectMenu } from "./components/ConnectMenu";
import Home from "./pages/Home";

function App() {
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  return (
    <>
      <div className="bg-blue-400">Mini App Review</div>
      <ConnectMenu />
      <Home />
    </>
  );
}

export default App;
