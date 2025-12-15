import { farcasterMiniApp as miniAppConnector } from "@farcaster/miniapp-wagmi-connector";
import { http, createConfig } from "wagmi";
import { celo, hardhat } from "wagmi/chains";

export const config = createConfig({
  chains: [celo, hardhat],
  connectors: [miniAppConnector()],
  transports: {
    [celo.id]: http(),
    [hardhat.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
