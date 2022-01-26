const nearAPI = require("near-api-js");

const { keyStores , Near} = nearAPI;

const KEY_PATH = "./cred.json";
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(KEY_PATH);

const REF_FINANCE_CONTRACT_ID ="v2.ref-finance.near";

const NETWORK_ID = "mainnet";

const MAX_POOLS_PER_PAGE = 100;

const near = new Near({
  keyStore,
  networkId: NETWORK_ID,
  nodeUrl: `https://rpc.${NETWORK_ID}.near.org`,
});

// const getPoolsPages = async () => {
//     const { result } = await near.connection.provider.query({
//       request_type: "call_function",
//       finality: "final",
//       account_id: REF_FINANCE_CONTRACT_ID,
//       method_name: "get_number_of_pools",
//       args_base64: "",
//     });
   
//     const total = JSON.parse(Buffer.from(result).toString());
//     console.log(total);
//     return Math.ceil(total / MAX_POOLS_PER_PAGE);
//   };

  const getPools = async (page = 1) => {
    const start = (page - 1) * MAX_POOLS_PER_PAGE;
    const { result } = await near.connection.provider.query({
      request_type: "call_function",
      finality: "final",
      account_id: REF_FINANCE_CONTRACT_ID,
      method_name: "get_pools",
      args_base64: Buffer.from(
        JSON.stringify({
          from_index: start,
          limit: MAX_POOLS_PER_PAGE,
        })
      ).toString("base64"),
    });
  
    return JSON.parse(Buffer.from(result).toString());
  };

getPools().then(res=> console.log(res)).catch(err=> console.log('err'))
