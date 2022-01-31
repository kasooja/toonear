"use strict";
/* Temp fix: Using .js for files where a protected method e.g. signAndSendTransaction, is being used, as
  .ts would not allow access these methods directly. */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stakeNear = exports.claimRewards = void 0;
const nearApi = __importStar(require("near-api-js"));
const claimRewards = async function claimRewards(config, accountId) {
    const near = await nearApi.connect(config);
    const account = await near.account(accountId);
    const action1 = nearApi.transactions.functionCall("claim", {
        account_id: accountId,
        token_id: "aaaaaa20d9e0e2461697782ef11675f668207961.factory.bridge.near",
        farm_id: 0,
    }, 100000000000000, nearApi.utils.format.parseNearAmount(String(nearApi.utils.format.formatNearAmount("1"))));
    let res = await account.signAndSendTransaction({
        receiverId: "aurora.pool.near",
        actions: [action1],
    });
    let decodedRes = await nearApi.providers.getTransactionLastResult(res);
    return decodedRes;
};
exports.claimRewards = claimRewards;
const stakeNear = async function stakeNear(config, accountId, amount_to_stake) {
    const near = await nearApi.connect(config);
    const account = await near.account(accountId);
    const action1 = nearApi.transactions.functionCall("deposit_and_stake", {}, 100000000000000, amount_to_stake);
    let res = await account.signAndSendTransaction({
        receiverId: "aurora.pool.near",
        actions: [action1],
    });
    let decodedRes = await nearApi.providers.getTransactionLastResult(res);
    return decodedRes;
};
exports.stakeNear = stakeNear;
//# sourceMappingURL=aurora_validator_utils.js.map