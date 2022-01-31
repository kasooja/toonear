"use strict";
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
exports.unwrap = void 0;
/* Temp fix: Using .js for files where a protected method e.g. signAndSendTransaction, is being used, as
  .ts would not allow access these methods directly. */
const nearApi = __importStar(require("near-api-js"));
const unwrap = async function unwrap(config, accountId, amount_to_unwrap) {
    const near = await nearApi.connect(config);
    const account = await near.account(accountId);
    const action1 = nearApi.transactions.functionCall("near_withdraw", { amount: amount_to_unwrap }, 100000000000000, nearApi.utils.format.parseNearAmount(String(nearApi.utils.format.formatNearAmount("1"))));
    let res = await account.signAndSendTransaction({
        receiverId: "wrap.near",
        actions: [action1],
    });
    let decodedRes = await nearApi.providers.getTransactionLastResult(res);
    return decodedRes;
};
exports.unwrap = unwrap;
//# sourceMappingURL=wrap_near_utils.js.map