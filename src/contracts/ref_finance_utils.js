/* Temp fix: Using .js for files where a protected method e.g. signAndSendTransaction, is being used, as 
  .ts would not allow access these methods directly. */

import * as nearApi from "near-api-js";

export const get_pool_token_1_sell_price = function get_pool_token_1_sell_price(
  token_1_amount_to_be_sold,
  pool_token_1_count,
  pool_token_2_count,
  fees
) {
  const product = pool_token_1_count * pool_token_2_count;
  const pool_token_amount_after_tx =
    pool_token_1_count + token_1_amount_to_be_sold;

  if (token_1_amount_to_be_sold == 0) {
    token_1_amount_to_be_sold = 1;
  }
  let token_price_for_tx =
    (pool_token_2_count - product / pool_token_amount_after_tx) /
    token_1_amount_to_be_sold;
  token_price_for_tx = token_price_for_tx - (fees / 100) * token_price_for_tx;
  return token_price_for_tx;
};

export const getPoolInfo = async function getPoolInfo(
  config,
  accountId,
  pool_id
) {
  const near = await nearApi.connect(config);
  const account = await near.account(accountId);

  const action1 = nearApi.transactions.functionCall(
    "get_pool",
    { pool_id: pool_id },
    100000000000000
  );

  let res = await account.signAndSendTransaction({
    receiverId: "v2.ref-finance.near",
    actions: [action1],
  });

  let decodedRes = await nearApi.providers.getTransactionLastResult(res);
  return decodedRes;
};

export const sellTokenTowNear = async function sellTokenTowNear(
  config,
  accountId,
  pool_id,
  token_amount,
  token_address,
  min_amount_out
) {
  const near = await nearApi.connect(config);
  const account = await near.account(accountId);

  const action1 = nearApi.transactions.functionCall(
    "ft_transfer_call",
    {
      receiver_id: "v2.ref-finance.near",
      amount: token_amount,
      msg:
        '{"force":0,"actions":[{"pool_id":' +
        pool_id +
        ',"token_in":"' +
        token_address +
        '","token_out":"wrap.near","amount_in":"' +
        token_amount +
        '","min_amount_out":"' +
        min_amount_out +
        '"}]}',
    },
    100000000000000,
    nearApi.utils.format.parseNearAmount(
      String(nearApi.utils.format.formatNearAmount("1"))
    )
  );

  let res = await account.signAndSendTransaction({
    receiverId: "aaaaaa20d9e0e2461697782ef11675f668207961.factory.bridge.near",
    actions: [action1],
  });

  let decodedRes = await nearApi.providers.getTransactionLastResult(res);
  return decodedRes;
};
