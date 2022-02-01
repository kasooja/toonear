/* Temp fix: Using .js for files where a protected method e.g. signAndSendTransaction, is being used, as 
  .ts would not allow access these methods directly. */

import * as nearApi from "near-api-js";
import * as constants from "../constants";
import { formatNearAmount } from "near-api-js/lib/utils/format";

export const claimRewards = async function claimRewards(config, accountId) {
  const near = await nearApi.connect(config);
  const account = await near.account(accountId);
  const action1 = nearApi.transactions.functionCall(
    "claim",
    {
      account_id: accountId,
      token_id: constants.AURORA_TOKEN_ADDRESS,
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
  let tx_log = [];
  for (let receipt_outcome_index in res["receipts_outcome"]) {
    let receipt_outcome = res["receipts_outcome"][receipt_outcome_index];
    let logs = receipt_outcome["outcome"]["logs"];
    logs.forEach(function (item, index) {
      tx_log.push(item);
    });
  }
  return tx_log;
};

export const stakeNear = async function stakeNear(
  config,
  accountId,
  amount_to_stake
) {
  const near = await nearApi.connect(config);
  const account = await near.account(accountId);
  const action1 = nearApi.transactions.functionCall(
    "deposit_and_stake",
    {},
    100000000000000,
    amount_to_stake
  );
  let res = await account.signAndSendTransaction({
    receiverId: "aurora.pool.near",
    actions: [action1],
  });
  let decodedRes = await nearApi.providers.getTransactionLastResult(res);
  return decodedRes;
};
