const nearAPI = require("near-api-js");
const os = require("os")
const path = require("path")

CRED_PATH = '/Users/gauneg/.near-credentials'
// CRED_PATH = path.join('/Users/gauneg/Desktop/block-chain-tools', 'cred.json')

const { connect, keyStores, KeyPair, transactions, WalletConnection } = nearAPI;


async function sendTransaction(){
    const config = {
        networkId: "mainnet",
        keyStore: new keyStores.UnencryptedFileSystemKeyStore(CRED_PATH),
        nodeUrl: "https://rpc.mainnet.near.org",
        walletUrl: "https://wallet.mainnet.near.org",
        helperUrl: "https://helper.mainnet.near.org",
        explorerUrl: "https://explorer.mainnet.near.org",
      };

      const near = await connect(config)
      const account = await near.account('iamtheuserofthis.near')

      
//functionCall(methodName: string, args: Uint8Array | object, gas: BN, 
// deposit: BN, stringify?: typeof stringifyJsonOrBytes): Action;
      const actions = [
        transactions.functionCall(
            methodName='claim',
            args={"account_id": "iamtheuserofthis.near", 
            "token_id": "aaaaaa20d9e0e2461697782ef11675f668207961.factory.bridge.near", 
            "farm_id": 0},
            gas = 30000000000000,
            deposit=nearAPI.utils.format.parseNearAmount("1"),
            )
      ];

      return account.signAndSendTransaction({
          receiverId: 'aurora.pool.near',
          actions
      })
}


sendTransaction()
.then(res=>{
    console.log(res)
}).catch(err=>{
    console.log('----------------ERROR------------')
    console.log(err)
    console.log('----------------ERROR------------')
})

