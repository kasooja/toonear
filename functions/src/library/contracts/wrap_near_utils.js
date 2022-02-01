/* Temp fix: Using .js for files where a protected method e.g. signAndSendTransaction, is being used, as 
  .ts would not allow access these methods directly. */
import * as nearApi from "near-api-js";

export const unwrap = async function unwrap(
  config,
  accountId,
  amount_to_unwrap
) {
  const near = await nearApi.connect(config);
  const account = await near.account(accountId);

  const action1 = nearApi.transactions.functionCall(
    "near_withdraw",
    { amount: amount_to_unwrap },
    100000000000000,
    nearApi.utils.format.parseNearAmount(
      String(nearApi.utils.format.formatNearAmount("1"))
    )
  );
  let res = await account.signAndSendTransaction({
    receiverId: "wrap.near",
    actions: [action1],
  });
  let decodedRes = await nearApi.providers.getTransactionLastResult(res);
  return decodedRes;
};
