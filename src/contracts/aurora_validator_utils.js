/* Temp fix: Using .js for files where a protected method e.g. signAndSendTransaction, is being used, as 
  .ts would not allow access these methods directly. */

import * as nearApi from "near-api-js";

export const claimRewards = async function claimRewards(config, accountId) {
  const near = await nearApi.connect(config);
  const account = await near.account(accountId);
  const action1 = nearApi.transactions.functionCall(
    "claim",
    {
      account_id: accountId,
      token_id: "aaaaaa20d9e0e2461697782ef11675f668207961.factory.bridge.near",
      farm_id: 0,
    },
    100000000000000,
    nearApi.utils.format.parseNearAmount(
      String(nearApi.utils.format.formatNearAmount("1"))
    )
  );
  let res = await account.signAndSendTransaction({
    receiverId: "aurora.pool.near",
    actions: [action1],
  });
  let decodedRes = await nearApi.providers.getTransactionLastResult(res);
  return decodedRes;
};
