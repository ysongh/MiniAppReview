import { farcasterMiniApp as miniAppConnector } from "@farcaster/miniapp-wagmi-connector";
import { http, createConfig } from "wagmi";
import { base, mainnet, hardhat } from "wagmi/chains";

export const config = createConfig({
  chains: [base, mainnet],
  connectors: [miniAppConnector()],
  transports: {
    [base.id]: http(),
    [mainnet.id]: http(),
    //@ts-ignore
    [hardhat.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
