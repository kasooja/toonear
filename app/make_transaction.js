const nearAPI = require("near-api-js");
const os = require("os")
const path = require("path")




CRED_PATH = '/Users/gauneg/.near-credentials'
// CRED_PATH = path.join('/Users/gauneg/Desktop/block-chain-tools', 'cred.json')

const { connect, keyStores, KeyPair, transactions, WalletConnection, providers, ConnectionInfo } = nearAPI;

const config = {
    networkId: "mainnet",
    keyStore: new keyStores.UnencryptedFileSystemKeyStore(CRED_PATH),
    nodeUrl: "https://rpc.mainnet.near.org",
    walletUrl: "https://wallet.mainnet.near.org",
    helperUrl: "https://helper.mainnet.near.org",
    explorerUrl: "https://explorer.mainnet.near.org",
  };


function get_pool_token_sell_price(token_amount_to_be_sold, pool_token_count, pool_zil_count, fees){
  
  product = pool_token_count * pool_zil_count
  pool_token_amount_after_tx = pool_token_count + token_amount_to_be_sold
  
  if(token_amount_to_be_sold==0){
      token_amount_to_be_sold = 1
  }
  token_price_for_tx = (pool_zil_count - product / pool_token_amount_after_tx) / token_amount_to_be_sold
  token_price_for_tx = token_price_for_tx - ((fees / 100) * token_price_for_tx)
  return token_price_for_tx
  
}
async function sendTransactionAPClaim(config){


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
            gas = 100000000000000,
            deposit=nearAPI.utils.format.parseNearAmount(String((nearAPI.utils.format.formatNearAmount("1")))),
            )
      ];

      return account.signAndSendTransaction({
          receiverId: 'aurora.pool.near',
          actions
      })
}


async function getPool(config){


    const near = await connect(config)
    const account = await near.account('iamtheuserofthis.near')

    
//functionCall(methodName: string, args: Uint8Array | object, gas: BN, 
// deposit: BN, stringify?: typeof stringifyJsonOrBytes): Action;
    const actions = [
      transactions.functionCall(
          methodName='get_pool',
          args={"pool_id": 1395
          },
          gas = 100000000000000
          )
    ];

    var res = await account.signAndSendTransaction({
        receiverId: 'v2.ref-finance.near',
        actions
    })

    
   let decodedRes = await providers.getTransactionLastResult(res)

   let amounts = decodedRes['amounts']

   console.log(get_pool_token_sell_price(1000000000000000000, amounts[0]/1000000000000000000, amounts[1]/1000000000000000000000000, 0.3))


}


async function wAuroraToWnear(config){
    const near = await connect(config)
    const account = await near.account('iamtheuserofthis.near')

    const actions = [
        transactions.functionCall(
            methodName='ft_transfer_call',
            receiverId='v2.ref-finance.near',
            amount="50000000000000000",
            msg={"pool_id": 1395
            },
            gas = 100000000000000
            )
      ];

      return account.signAndSendTransaction({
        receiverId: 'aaaaaa20d9e0e2461697782ef11675f668207961.factory.bridge.near',
        actions
    })

}


// sendTransaction(config)
 getPool(config)
.then(res=>{
    console.log(JSON.stringify(res))
}).catch(err=>{
    console.log('----------------ERROR------------')
    console.log(err)
    console.log('----------------ERROR------------')
})

