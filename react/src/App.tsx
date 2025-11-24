import { sdk } from "@farcaster/miniapp-sdk";
import { useEffect } from "react";

import { ConnectMenu } from "./components/ConnectMenu";

function App() {
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  return (
    <>
      <div className="bg-blue-400">Mini App Review</div>
      <ConnectMenu />
    </>
  );
}

export default App;
