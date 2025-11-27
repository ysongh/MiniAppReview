import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("MiniAppReviewModule", (m) => {
  const miniAppReview = m.contract("MiniAppReview");

  return { miniAppReview };
});
